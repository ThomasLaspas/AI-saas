import Header from "@/components/header";
import { createSupabaseServerClient } from "@/supabase/serverclient"
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Home() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()

  return (
    <div className="h-[80vh]">
      <Header />
      {data.user ? <Button><Link href="/dashboard">Jumb to the Unreal AI experiece</Link></Button> : <Button><Link href="/login">Log in  to unlock Ai feauters</Link></Button>}
      <h1>Hello im Ultron</h1>


    </div>
  );
}
