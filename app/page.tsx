import Header from "@/components/header";
import { createSupabaseServerClient } from "@/supabase/serverclient"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
export default async function Home() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()


  return (
    <div className="h-[80vh] ">
      <Header />



      <section className="w-full flex flex-col items-center gap-12 sm:mt-[14%] mt-[40%] p-5">
        <TextGenerateEffect className=" text-center" words="Allow me to introduce myself. I'm Friday, a virtual artificial intelligence designed by Mr. Laspas. The system is fully operational." />

        {data.user ? <Button><Link href="/dashboard">Jumb to the Unreal AI experiece</Link></Button> : <Button><Link href="/login">Log in  to unlock Ai feauters</Link></Button>}
      </section>




    </div >
  );
}
