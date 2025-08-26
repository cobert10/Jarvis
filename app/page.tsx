import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="flex justify-between">
      <h1 className='text-2xl underline'>Jarvis -- AI powered companion</h1>
      <div className="flex justify-between gap-2">
        <Button><Link href="/sign-in">Sign In</Link></Button>
        <Button><Link href="/sign-up">Sign Up</Link></Button>
      </div>
    </div>
    
  )
}

export default Page