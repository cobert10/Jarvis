'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"

const OTPModal = ({accountId, email}: {accountId: {accountId: string}; email: string;}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true)
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("")
        
        try{
            // call api to verify otp
            
            const sessionId = await verifySecret({accountId, password})

            if(sessionId) router.push("/dashboard/companion");

        }catch(error){
            setErrorMessage("Failed to verify the OTP")
        }
        setIsLoading(false)
    };

    const handleResendOtp = async() => {
        // call api to resent OTP
        await sendEmailOTP({email})
    };



  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
        <AlertDialogContent className="shad-alert-content w-[350px]">
            <AlertDialogHeader className="relative flex justify-center">
            <AlertDialogTitle className="shad-otp-header">Enter your OTP
                <Image src="/icons/close-dark.svg" alt="close" width={20} height={20} onClick={() => setIsOpen(false)} className="shad-otp-close-button"/>
            </AlertDialogTitle>
            <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                We&apos;ve sent a code to <span className="pl-1 text-brand">{email}</span>
            </AlertDialogDescription>
            </AlertDialogHeader>
            
            <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup className="shad-otp">
                <InputOTPSlot index={0} className="shad-otp-slot ring-[#197278] text-[#197278] shadow-drop border-2"/>
                <InputOTPSlot index={1} className="shad-otp-slot ring-[#197278] text-[#197278] shadow-drop border-2"/>
                <InputOTPSlot index={2} className="shad-otp-slot ring-[#197278] text-[#197278] shadow-drop border-2"/>
                <InputOTPSlot index={3} className="shad-otp-slot ring-[#197278] text-[#197278] shadow-drop border-2"/>
                <InputOTPSlot index={4} className="shad-otp-slot ring-[#197278] text-[#197278] shadow-drop border-2"/>
                <InputOTPSlot index={5} className="shad-otp-slot ring-[#197278] text-[#197278] shadow-drop border-2"/>
            </InputOTPGroup>
            </InputOTP>

            <AlertDialogFooter>
                <div className="flex w-full flex-col gap-4">
                    <AlertDialogAction onClick={handleSubmit} className=" bg-[#197278] hover:bg-[#283d3b] h-12" type="button">Submit {isLoading && (<Image src="/icons/loader.svg" alt="loader" width={24} height={24} className="ml-2 animate-spin "/>)}</AlertDialogAction>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <div className="subtitle mt-2 text-center text-light-100">
                        Didn&apos;t get a code?
                        <Button type = "button" variant="link" className="pl-1 text-red-800" onClick={handleResendOtp}>Click to resend.</Button>
                    </div>
                </div>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default OTPModal
