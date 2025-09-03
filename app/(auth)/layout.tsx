import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import Image from "next/image"
import React from "react"

const layout = ({children}: {children: React.ReactNode}) => {
    const words = [
    { text: "Jarvis", className: "!text-brand"},
    { text: "--", className: "text-white"},
    { text: "Your", className: "text-white" },
    { text: "Learning", className: "text-white" },
    { text: "AI" , className: "text-white"},
    { text: "Companion", className: "text-white" },
  ];
  return (
    <div className="flex min-h-screen">
      <section className="brand-layout">
        <div className="flex max-h-[800px] max-w[360px] flex-col justify-center items-center space-y-12">
            <TypewriterEffect words = {words}/>
            <Image src="/images/logo.png" alt="brand" width={200} height={200}></Image>
        </div>
      </section>
      <section className="sign-in-up-layout">
        {children}
      </section>
    </div>
  )
}

export default layout
   