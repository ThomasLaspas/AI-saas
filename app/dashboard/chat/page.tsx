import React from 'react'
import { ChatBubbleIcon } from "@radix-ui/react-icons"
import Aichat from '@/components/Aichat'
function page() {
    return (
        <div className='px-6'>
            <section className='flex items-start gap-2'>
                <ChatBubbleIcon width={60} height={60} />
                <div>
                    <h1 className='sm:text-4xl'>Conversation</h1>
                    <p>Our most advanced convartation model.</p>
                </div>
            </section>

            <Aichat />


        </div>
    )
}

export default page