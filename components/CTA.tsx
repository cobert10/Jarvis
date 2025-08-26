import Image from "next/image"
import Link from "next/link"
import React from "react"

const CTA = () => {
  return (
      <div className="w-full max-lg:w-1/2 bg-black text-white flex flex-col text-center items-center rounded-3xl py-4">
        <button className="btn-primary bg-[#197278] text">Learn it your way</button>
        <h2 className="text-3xl font-bold text-center ">Create and Personalize your Learning Companion</h2>
        <p className="text-sm items-center p-4">Pick a name, subject, voice, & personality -- and start learning through chat through voice conversation that feel natural and fun</p>
        <button className="btn-primary bg-red-800">
          <Image src="/icons/plus.svg" alt="plus" width={24} height={24}/>
          <Link href="/">
            <p>Create a new Companion</p>
          </Link>
        </button>
      </div>
    
  )
}

export default CTA
