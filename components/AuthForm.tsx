'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import React, { useState } from 'react'
import { Input } from './ui/input'
import Link from "next/link"
import { Button } from "./ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { createAccount } from "@/lib/actions/user.actions"
import Image from "next/image"
import OTPModal from "./OTPModal"
import { signInUser } from "@/lib/actions/user.actions"

type FormType = "sign-in" | "sign-up"

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    password: formType == "sign-up"? z.string()
    .min(8, "Password must contain atleast 8 characters")
    .max(32, "Password must not exceed 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"): z.string(),
    
    firstName: formType === "sign-up" ? z.string().min(2).max(50): z.string().optional(),
    lastName: formType === "sign-up" ? z.string().min(2).max(50): z.string().optional(),
    birthDate: formType === "sign-up" ? z.date(): z.date().optional()
  });
};

const AuthForm = ({type}: {type: FormType}) => {
const [isLoading, setIsLoading] = useState(false)
const [errorMessage, setErrorMessage] = useState('')
const [accountId, setAccountId] = useState(null)
const [open, setOpen] = useState(false)

const formSchema = authFormSchema(type)
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        firstName: "",
        lastName: "",
        birthDate: undefined,
        email: "",
        password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("")
 
    try{
        let user = null;
        if(type === "sign-up"){
          user = await createAccount({
            firstName: values.firstName || '', 
            lastName: values.lastName || '', 
            birthDate: values.birthDate || null,
            email: values.email,
            password: values.password
          });
        }

        else if(type === "sign-in"){
          user = await signInUser({email:values.email, password:values.password});

          if(!user.success){
            setErrorMessage(user.error)
          }
        }
        
        setAccountId(user.accountId);
      }
      catch {
        setErrorMessage("Email already Exists. Please try again.")
      }
      finally{
        setIsLoading(false);
      }
    }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <div className="w-[480px] text-[#197278]">
            <div className="flex flex-col gap-2  w-full border rounded-md bg-white p-10">
              <h1 className="flex justify-center">{type === "sign-in" ? "Sign In": "Sign Up" }</h1>
              {type === "sign-up"  && (
                <>
                  <div className="flex flex-row justify-between">
                    <FormField 
                        control = {form.control} 
                        name = "firstName"
                        render={({ field }) => (
                            <FormItem>
                            <div className="shad-form-item">
                                <FormLabel className="shad-form-label">First Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter first name" className="shad-input" {...field} />
                                </FormControl>
                            </div>
                            <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control = {form.control} 
                        name = "lastName"
                        render={({ field }) => (
                            <FormItem>
                            <div className="shad-form-item">
                                <FormLabel className="shad-form-label">Last Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter last name" className="shad-input" {...field} />
                                </FormControl>
                            </div>
                            <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                  </div>

                  <FormField 
                    control = {form.control} 
                    name = "birthDate"
                    render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                          <FormLabel className="shad-form-label">Date of Birth</FormLabel>
                          <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  id="birthDate"
                                  className="w-full justify-between font-normal text-gray-500"
                                >
                                  {field.value ? field.value.toLocaleDateString() : "Select date"}
                                  <ChevronDownIcon />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value?? undefined}
                                  captionLayout="dropdown"
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    setOpen(false)
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>)}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter Email" className="shad-input" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>)}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">Password</FormLabel>
                      <FormControl>
                          <PasswordInput 
                            id="password" 
                            placeholder="Enter Password"
                            {...field}
                            />
                      </FormControl>
                    </div>
                    <FormMessage className="shad-form-message" />
                </FormItem>)}
              />

              <Button type="submit" className="bg-[#197278] mt-4 hover:bg-[#283d3b] hover:text-white">
                {type === "sign-in" ? "Sign In": "Sign Up"}
                {isLoading && (<Image src="/icons/loader.svg" alt="loader" width={24} height={24} className="ml-2 animate-spin" />)}
              </Button>

              {errorMessage && (
                <p className="text-red-700"> {errorMessage}</p>
              )}

              <div className="flex gap-2 ">       
                <p>{type === "sign-in" ? "Don't Have an account?" : "Already have an account?"}</p>
                <Link href={type === "sign-in" ? "/sign-up": "sign-in"} className="text-[#772e25]">{type === "sign-in"? "Register": "Login"}</Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
      {accountId &&(
        <OTPModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  )
}

export default AuthForm