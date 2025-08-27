'use client'

import { navItems } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { signOutUser } from "@/lib/actions/user.actions"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
const Navbar = () => {
    const pathname = usePathname();
  return (
   <nav className="hidden sm:flex items-center justify-between p-4 bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg">
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
                <Link href={link} key={label} className="group relative">
                    <li className={`cursor-pointer transition ${pathname === link ? "text-brand" : "text-slate-200 hover:text-brand"}`} >
                        {label}
                        <span className={`absolute left-0 -bottom-1 h-0.5 bg-brand transition-all duration-300
${pathname === link ? "w-full" : "w-0 group-hover:w-full"}`}/>
                    </li>
                </Link>
            ))}
            <li>
                <Button type="submit" 
                        className="mobile-sign-out-button cursor-pointer text-white font-medium 
                                    bg-slate-700/50 border border-slate-500/30 
                                    backdrop-blur-sm hover:bg-brand/60 hover:text-white
                                    transition"  
                        onClick={async() => await signOutUser()}>
                    <p>Logout</p>
                </Button>
            </li>
        </ul>
    </div>
   </nav>
  )
}

export default Navbar
