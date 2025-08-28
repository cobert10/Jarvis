import Image from "next/image"
import Link from "next/link"
import React from "react"

const CTA = () => {
  return (
      <div className="cta-section">
        <button className="btn-primary bg-brand text">Learn it your way</button>
        <h2 className="text-3xl font-bold text-center ">Create and Personalize your Learning Companion</h2>
        <p className="text-sm items-center p-4">Pick a name, subject, voice, & personality -- and start learning through chat through voice conversation that feel natural and fun</p>
        <Image src="/images/cta.svg" alt="cta" width={350} height={250}></Image>
        <button className="btn-primary bg-red-800">
          <Image src="/icons/plus.svg" alt="plus" width={24} height={24}/>
          <Link href="/dashboard/companions/new">
            <p>Create a new Companion</p>
          </Link>
        </button>
      </div>
    
  )
}

export default CTA
