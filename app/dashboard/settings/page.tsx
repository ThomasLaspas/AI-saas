import React from 'react'
import { GearIcon } from "@radix-ui/react-icons"
import { createSupabaseServerClient } from "@/supabase/serverclient"
import { readprem } from '@/utils/limit'
import Settingsbtn from '@/components/Settingsbtn'
async function page() {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    let user
    if (data) {
        user = await readprem(data.user?.id)
        console.log(user)
    }

    const defaultUser = {
        free_tries: 0,
        premium: false,
        stripe_customer_id: ''
    }
    return (
        <div className='px-6'>
            <section className='flex items-start gap-2'>
                <GearIcon width={60} height={60} />
                <div>
                    <h1 className='sm:text-4xl'>Settings</h1>
                    <p>Hello {data.user?.email}</p>
                </div>
            </section>

            <Settingsbtn user={user ?? defaultUser} email={data.user?.email} />


        </div>
    )
}

export default page