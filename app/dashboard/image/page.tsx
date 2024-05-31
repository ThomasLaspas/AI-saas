import React from 'react'
import { ImageIcon } from "@radix-ui/react-icons"
import Aiimage from '@/components/Aiimage'
function page() {
    return (
        <div className='px-6'>
            <section className='flex items-start gap-2'>
                <ImageIcon width={60} height={60} />
                <div>
                    <h1 className='sm:text-4xl'>Image</h1>
                    <p>Our most advanced Image generator.</p>
                </div>
            </section>

            <Aiimage />


        </div>
    )
}

export default page