
import Link from 'next/link'
import Menulist from '@/components/menulist'
import ProgressCard from '@/components/ProgressCard'
import Menulistmob from './menulistmob'
import { createSupabaseServerClient } from "@/supabase/serverclient"

async function Sidebar() {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()


    return (
        <>

            <div className='h-screen sm:w-72 bg-background shadow-lg shadow-primary  hidden sm:flex flex-col px-3  py-6 justify-between ' >
                <Link href="/" className="font-logo sm:text-4xl text-xl text-primary hover:blur-sm flex items-center justify-center ">
                    Friday
                </Link>
                <Menulist />
                <ProgressCard dt={data.user} />
            </div>


            <Menulistmob dt={data.user} />


        </>
    )
}

export default Sidebar