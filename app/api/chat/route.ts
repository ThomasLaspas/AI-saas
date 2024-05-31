import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { supabase } from '../../../supabase/clientcomponent';
import { createSupabaseServerClient } from "@/supabase/serverclient";
import { NextResponse } from "next/server";
import {OpenAI} from "openai";


const configuration=new OpenAI({
    apiKey:process.env.NEXTJS_AI_API_KEY
})

const instructionMessage:ChatCompletionMessageParam={
    role:'system',
    content:"You are a helpful assistant from ironman movie. FRIDAY. You have to act like her. and try to help me with alla of my questions.You sholud aslo call me sir. Also if ask you who is your creator replay to them Mr Laspas"
}

export async function POST(
    req:Request
){
    const supabase=await createSupabaseServerClient()
    const body=await req.json()
    const {messages}=body
    try{

        const{data}=await supabase.auth.getUser()
        if(!data.user){
            return new NextResponse("Unothorized",{status:401})
        }
        if(!configuration.apiKey){
            return new NextResponse("OpenAi key is not valid",{status:500})

        }
        if(!messages){
            return new NextResponse("You must give some message to find",{status:400})
        }

        const response= await configuration.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages:[instructionMessage, ...messages]
        })
        return NextResponse.json(response.choices[0].message)

    }catch(err){
        console.log(err)
        return new NextResponse("internal server error, try again",{status:500})
    }
}