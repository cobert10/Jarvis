'use client'

import { navItems } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { signOutUser } from "@/lib/actions/user.actions"
import { Button } from "./ui/button"
const Navbar = () => {
  return (
   <nav className="hidden sm:flex items-center justify-between p-4">
    <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
            <Image 
                src="/images/logo.png" 
                alt="logo"
                width={46}
                height={46}
            />
        </div>
    </Link>
    <div >
        <ul className="flex items-center gap-8">
            {navItems.map(({label, link}) => (
                <Link href={link} key={label}>
                    <li className="no-underline" >{label}</li>
                </Link>
            ))}
            <li>
                <Button type="submit" className="mobile-sign-out-button cursor-pointer bg-transparent hover:bg-white ring-1 text-black" onClick={async() => await signOutUser()}>
                    <p>Logout</p>
                </Button>
            </li>
        </ul>
    </div>
   </nav>
  )
}

export default Navbar
