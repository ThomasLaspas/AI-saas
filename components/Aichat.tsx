"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { cn } from "@/lib/utils";
import Fridayavatar from "./Fridayavatar";
import UserAvatar from "./userAvatar";
import { voice } from "@/utils/Aivoice";

import { Checkfor5, addtrie } from "@/utils/limit";
const formSchema = z.object({
    Convertation: z.string()
})





function Aichat() {

    const router = useRouter()
    const [msg, setmsg] = useState<ChatCompletionMessageParam[]>([])
    const [load, setload] = useState<boolean>(false)
    const [error, seterrro] = useState<boolean>(false)
    const [tried, settried] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Convertation: "",
        },
    })



    const handlesum = async (values: z.infer<typeof formSchema>) => {

        setload(true)
        seterrro(false)
        settried(false)
        const canProceed = await Checkfor5();
        if (canProceed) {
            try {
                const userMessage: ChatCompletionMessageParam = {
                    role: "user",
                    content: values.Convertation
                }
                const newMessages = [...msg, userMessage]
                const response = await fetch("/api/chat", {
                    method: 'POST',
                    body: JSON.stringify({ messages: newMessages }),
                    headers: { "Content-Type": "application/json" }
                })
                const data = await response.json()

                setmsg((current) => [...current, userMessage, data])
                form.reset()
                const audioUrl = await voice(data.content);
                const ai = new Audio(audioUrl)
                ai.play()
                await addtrie()

            } catch (err: any) {
                seterrro(true)

            } finally {
                setload(false)
                router.refresh()
            }
        }
        else {
            setload(false)
            settried(true)
        }


    }

    return (
        <div className="w-full mt-10">

            <div className='p-4 w-full border-2 border-primary flex items-center'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlesum)} className="lg:flex items-end w-full lg:justify-between flex-col lg:flex-row ">
                        <FormField

                            control={form.control}
                            name="Convertation"
                            render={({ field }) => (
                                <FormItem className="w-full ">

                                    <FormControl >
                                        <Input placeholder="Give your question"  {...field} className="w-full border-none" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="lg:w-max w-full">Submit</Button>
                    </form>
                </Form></div>
            {load ? <section className="w-full h-[50vh] grid place-items-center">
                <div className="loader"></div>

            </section> : <section className="w-ful flex flex-col gap-y-5 mt-20 mb-20">
                {msg.map((message, index) => {
                    return (
                        <div key={index} className={cn("w-full p-6 rounded-3xl gap-x-6", message.role === "user" ? "bg-primary text-black border-black flex flex-row-reverse items-end" : "bg-muted flex flex-row items-start")}>
                            {message.role === "user" ? <UserAvatar /> : <Fridayavatar />}
                            {typeof message.content === 'string' && (
                                <p>{message.content}</p>
                            )}
                        </div>
                    )
                })}
                {error ? <h1 className=" text-red-600 text-2xl"> some error ocured try again</h1> : null}
                {tried ? <h1 className=" text-red-600 text-2xl"> You must buy premium</h1> : null}

            </section>}


        </div>
    )
}

export default Aichat