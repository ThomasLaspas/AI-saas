"use server"

import { createSupabaseServerClient } from "@/supabase/serverclient";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth:process.env.NEXTJS_MUSIC_GENERATORAI!
});


export async function POST(
    req:Request
){
    const supabase=await createSupabaseServerClient()
    const body=await req.json()
    const {music}=body
    try{

        const{data}=await supabase.auth.getUser()
        if(!data.user){
            return new NextResponse("Unothorized",{status:401})
        }
       
        const input = {
            prompt_b: music
        };

        const output = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",  {input} );
   
        return NextResponse.json(output)
     

    }catch(err){
        console.log(err)
        return new NextResponse("internal server error, try again",{status:500})
    }
}