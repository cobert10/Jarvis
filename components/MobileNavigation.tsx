'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import React, { useState } from 'react'
import Image from 'next/image';
import Link from "next/link";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = () => {
const [open, setOpen] = useState(false);

  return (
        <header className="flex sm:hidden items-cener justify-between p-4">
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
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger><Image src="/icons/menu.svg" alt="search" width={30} height={30} className="cursor-pointer"/></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="header-user">
                </div>
                <Separator className="mb-4 bg-light-200/20"/>
              </SheetTitle>
              <nav className="mobile-nav">
                <ul className="mobile-nav-list">
                  {navItems.map(({label, link}) => (
                    <Link href={link} key={label}>
                      <li className={cn("mobile-nav-item",  "shad-active")} key={label}>
                        <p>{label}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </nav>
            </SheetHeader>
            
            <Separator className="my-2 bg-light-200/20"/>

            <div className="flex flex-col justify-between gap-5 absolute bottom-4 left-4 right-4">
              <Button type="submit" className="mobile-sign-out-button" onClick={async() => await signOutUser()}>
                  <Image src="/icons/logout.svg" alt="logout" width={24} height={24} />
                  <p>Logout</p>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
    </header>
  )
}

export default MobileNavigation
