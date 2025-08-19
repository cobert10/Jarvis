import Image from 'next/image'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
      <section className='p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-1/3 bg-[#f2e8cf]'>
        <div className="flex max-h-[800px] max-w[360px] flex-col justify-center items-center space-y-12">
            Jarvis -- Your learning companion
            <Image src="/images/logo.png" alt="brand" width={200} height={200}></Image>
        </div>
      </section>

      <section className='bg-[#ffffff] flex flex-col flex-1 items-center justify-center lg:p-2 lg:py-0'>
        {children}
      </section>
      
    </div>
  )
}

export default layout
   