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
    const {video}=body
    try{

        const{data}=await supabase.auth.getUser()
        if(!data.user){
            return new NextResponse("Unothorized",{status:401})
        }
       
        const input = {
            fps: 24,
            width: 1024,
            height: 576,
            prompt: video,
            guidance_scale: 17.5,
            negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
        };

        const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
        console.log(output)
        return NextResponse.json(output)
     

    }catch(err){
        console.log(err)
        return new NextResponse("internal server error, try again",{status:500})
    }
}