"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"
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
import { Checkfor5 } from "@/utils/limit";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { addtrie } from "@/utils/limit";


const formSchema = z.object({
    video: z.string().min(1, "Music is required"),


})





function Aivideo() {
    const { toast } = useToast()
    const router = useRouter()
    const [video, sevideo] = useState<string | null>(null)
    const [load, setload] = useState<boolean>(false)
    const [error, seterrro] = useState<boolean>(false)
    const [tried, settried] = useState<boolean>(false)



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            video: "",


        },
    })



    const handlesum = async (values: z.infer<typeof formSchema>) => {
        setload(true)
        seterrro(false)
        settried(false)
        const canProceed = await Checkfor5();

        if (canProceed) {

            try {
                const response = await fetch("/api/video", {
                    method: 'POST',
                    body: JSON.stringify({
                        input: values.video,

                    }),
                    headers: { "Content-Type": "application/json" }
                });

                if (response.ok) {
                    const data = await response.json();
                    sevideo(data)
                    form.reset();
                    await addtrie()

                } else {
                    const errorText = await response.text();
                    console.log("Error:", errorText);
                }
            } catch (err: any) {
                seterrro(true)
            } finally {
                setload(false);
                router.refresh();
            }

        }
        else {
            setload(false)
            settried(true)

        }

    }

    return (
        <div className="w-full mt-10">

            <div className='p-4 w-full border-2 border-primaryflex items-center  '>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlesum)} className="lg:flex items-end w-full lg:justify-between flex-col lg:flex-row ">
                        <FormField

                            control={form.control}
                            name="video"
                            render={({ field }) => (
                                <FormItem className="lg:w-2/4 w-full " >

                                    <FormControl >
                                        <Input placeholder="Give your question"  {...field} className="w-full border-none" disabled={load} />
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

            </section> : (video ? <section className="w-full flex items-center justify-center  mt-20 mb-20">

                <video >

                    <source src={video} />
                </video>




            </section> : <section className="w-full flex items-center justify-center  mt-20 mb-20">
                {error ? <h1 className=" text-red-600 text-2xl"> some error ocured try again</h1> : null}
                {tried ? <h1 className=" text-red-600 text-2xl"> You must buy premium</h1> : null}

            </section>)
            }


        </div >
    )
}

export default Aivideo