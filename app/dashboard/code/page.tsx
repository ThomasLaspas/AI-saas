import React from 'react'
import { CodeIcon } from "@radix-ui/react-icons"
import Aicodechat from '@/components/Aicodechat'
function page() {
    return (
        <div className='px-6'>
            <section className='flex items-start gap-2'>
                <CodeIcon width={60} height={60} />
                <div>
                    <h1 className='sm:text-4xl'>Code</h1>
                    <p>Our most advanced Code model.</p>
                </div>
            </section>

            <Aicodechat />


        </div>
    )
}

export default page