import React from 'react'
import { PlayIcon } from "@radix-ui/react-icons"
import Aimusic from '@/components/Aimusic'
function page() {
    return (
        <div className='px-6'>
            <section className='flex items-start gap-2'>
                <PlayIcon width={60} height={60} />
                <div>
                    <h1 className='sm:text-4xl'>Music</h1>
                    <p>Our most advanced Music generator.</p>
                </div>
            </section>

            <Aimusic />


        </div>
    )
}

export default page