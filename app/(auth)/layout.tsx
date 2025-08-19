import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import Image from 'next/image'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
    const words = [
    { text: "Jarvis", className: "text-[#197278]" },
    { text: "--" },
    { text: "Your" },
    { text: "Learning" },
    { text: "AI" },
    { text: "Companion" },
  ];
  return (
    <div className='flex min-h-screen'>
      <section className='p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-1/3 bg-[#f2e8cf]'>
        <div className="flex max-h-[800px] max-w[360px] flex-col justify-center items-center space-y-12">
            <TypewriterEffect words = {words}/>
            <Image src="/images/logo.png" alt="brand" width={200} height={200}></Image>
        </div>
      </section>

      <section className='bg-[#772e25] flex flex-col flex-1 items-center justify-center lg:p-2 lg:py-0'>
        {children}
      </section>
      
    </div>
  )
}

export default layout
   