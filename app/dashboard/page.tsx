import AuthButton from "@/components/AuthButton"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    TokensIcon,
    ChatBubbleIcon,
    ImageIcon,
    VideoIcon,
    CodeIcon,
    PlayIcon,
    GearIcon,
} from "@radix-ui/react-icons";
import { createSupabaseServerClient } from "@/supabase/serverclient"
import { redirect } from "next/navigation"
async function page() {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
        return redirect("/")
    }

    return (

        <div className="sm:p-6  p-0 w-full grid place-items-center">
            <h1 className="w-full text-center sm:text-5xl text-lg ">Explore the power of AI</h1>
            <h4 className="w-full text-center mt-6 sm:text-xl">Chat with the smartest AI - Experience the power of AI</h4>

            <section className="mt-8 w-3/4">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="px-10 bg-primary text-background rounded-xl hover:shadow-md hover:shadow-primary">
                        <AccordionTrigger><div className="flex items-center gap-6 sm:text-lg text-md"><ChatBubbleIcon width={24} height={24} />Conversation</div> </AccordionTrigger>
                        <AccordionContent>
                            Real time conversation between us, i can answer every of your question.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="px-10  mt-10 bg-primary text-background rounded-xl hover:shadow-md hover:shadow-primary">
                        <AccordionTrigger><div className="flex items-center gap-6 sm:text-lg text-md"><PlayIcon width={24} height={24} />Music Generator</div></AccordionTrigger>
                        <AccordionContent>
                            Lets give some rithm !!.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="px-10 mt-10 bg-primary text-background rounded-xl hover:shadow-md hover:shadow-primary">
                        <AccordionTrigger><div className="flex items-center gap-6 sm:text-lg text-md "><ImageIcon width={24} height={24} />Image Generation
                        </div></AccordionTrigger>
                        <AccordionContent>
                            Lets make a photos that only exist in yoour imagination.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="px-10 mt-10 bg-primary text-background rounded-xl hover:shadow-md hover:shadow-primary">
                        <AccordionTrigger><div className="flex items-center gap-6 sm:text-lg text-md text-nowrap" ><CodeIcon width={24} height={24} />Code Generation</div></AccordionTrigger>
                        <AccordionContent>
                            I can help you to develop together amazing web apps and Saas.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section></div>
    )
}

export default page