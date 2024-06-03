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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { saveAs } from "file-saver";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Checkfor5, addtrie } from "@/utils/limit";



const formSchema = z.object({
    Convertation: z.string().min(1, "Convertation is required"),

    resolution: z.string().min(1, "Resolution is required")
})





function Aiimage() {
    const { toast } = useToast()
    const router = useRouter()
    const [img, setimg] = useState<string | null>(null)
    const [load, setload] = useState<boolean>(false)
    const [error, seterrro] = useState<boolean>(false)
    const [tried, settried] = useState<boolean>(false)

    const downolad = () => {
        if (img) {
            saveAs(img, "Ai generated img")
        }

    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Convertation: "",

            resolution: ""
        },
    })



    const handlesum = async (values: z.infer<typeof formSchema>) => {
        setload(true)
        seterrro(false)
        settried(false)
        const canProceed = await Checkfor5();
        if (canProceed) {
            try {
                const response = await fetch("/api/image", {
                    method: 'POST',
                    body: JSON.stringify({
                        promt: values.Convertation,
                        amount: 1,
                        resolution: values.resolution
                    }),
                    headers: { "Content-Type": "application/json" }
                });

                if (response.ok) {
                    const data = await response.json();

                    setimg(data.url)
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

        } else {
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
                            name="Convertation"
                            render={({ field }) => (
                                <FormItem className="lg:w-2/4 w-full " >

                                    <FormControl >
                                        <Input placeholder="Give your question"  {...field} className="w-full border-none" disabled={load} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="resolution"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={load}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a resolution" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="lg:w-1/2" >
                                            <SelectItem value="1024x1024">Low</SelectItem>
                                            <SelectItem value="1792x1024">HIGH</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="lg:w-max w-full">Submit</Button>
                    </form>
                </Form></div>
            {load ? <section className="w-full h-[50vh] grid place-items-center">
                <div className="loader"></div>

            </section> : (img && <section className="w-ful flex flex-col gap-y-5 mt-20 mb-20">

                <div className="w-full h-[50vh] grid place-items-center">
                    <Image
                        src={img}
                        height={500}
                        width={500}
                        alt="img"
                        className="sm:w-[500px] w-[200px] sm:h-[500px] h-[200px]"

                    />
                    <Button>Download</Button>
                </div>
                {error ? <h1 className=" text-red-600 text-2xl"> some error ocured try again</h1> : null}
                {tried ? <h1 className=" text-red-600 text-2xl"> You must buy premium</h1> : null}


            </section>)}


        </div>
    )
}

export default Aiimage