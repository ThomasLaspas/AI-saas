"use server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

// Initialize OpenAI with the API key
const configuration = new OpenAI({
    apiKey: process.env.NEXTJS_AI_API_KEY
});

// Voice function to create and save the audio file
export async function voice(text: string) {
    // Create a unique identifier for the file
    const d = new Date();
    const id = d.getTime();
    // Correct the path to the public directory
    const speechFile = path.resolve(`./public/static/voice${id}.mp3`);

    // Ensure the directory exists
    const dir = path.dirname(speechFile);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Generate the audio using OpenAI
    const mp3 = await configuration.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text,
    });

    // Convert the response to a buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Write the buffer to the file
    await fs.promises.writeFile(speechFile, buffer);

    // Return the path to the saved file
    return `/static/voice${id}.mp3`;
}


