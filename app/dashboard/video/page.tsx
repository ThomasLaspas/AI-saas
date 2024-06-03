import React from 'react'
import { VideoIcon } from "@radix-ui/react-icons"
import Aivideo from '@/components/Aivideo'
function page() {
    return (
        <div className='px-6'>
            <section className='flex items-start gap-2'>
                <VideoIcon width={60} height={60} />
                <div>
                    <h1 className='sm:text-4xl'>Video</h1>
                    <p>Our most advanced Video generator.</p>
                </div>
            </section>

            <Aivideo />


        </div>
    )
}

export default page