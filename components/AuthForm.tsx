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

type FormType = "sign-in" | "sign-up"

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long").max(32, "Password cannot exceed 32 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  
    firstName: formType === "sign-up" ? z.string().min(2).max(50): z.string().optional(),
    lastName: formType === "sign-up" ? z.string().min(2).max(50): z.string().optional(),
  });
};

const AuthForm = ({type}: {type: FormType}) => {

const [isLoading, setIsLoading] = useState(false)
const [errorMessage, setErrorMessage] = useState('')
const [accountId, setAccountId] = useState(null)

const formSchema = authFormSchema(type)

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("")
    
    try{
        let user = null;
        if(type === "sign-up"){
          user = await createAccount({fullName: values.fullName || '', email: values.email});
        }
        else if(type == "sign-in"){
          user = await signInUser({email:values.email});
        }
    
        setAccountId(user.accountId);
      }
      catch {
        setErrorMessage("failed to create account. Please try again.")
      }
      finally{
        setIsLoading(false);
      }
    }

  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form"></form>
                <div className="w-[480px] text-[#197278]">
                    <div className="flex flex-col gap-2  w-full border rounded-md bg-white p-10">
                        <h1 className="">{type === "sign-in" ? "Sign In": "Sign Up" }</h1>
                       

                        {type === "sign-up"  && (
                            <>
                            <FormField 
                                control = {form.control} 
                                name = "firstName"
                                render={({ field }) => (
                                    <FormItem>
                                    <div className="shad-form-item">
                                        <FormLabel className="shad-form-label">First Name</FormLabel>
                                        <FormControl>
                                        <Input placeholder="Enter your first name" className="shad-input" {...field} />
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
                                        <Input placeholder="Enter your last name" className="shad-input" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="shad-form-message" />
                                    </FormItem>
                                )}
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
                                    <Input placeholder="Enter your Email" className="shad-input" {...field} />
                                </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                <FormLabel className="shad-form-label">Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" className="shad-input" {...field} />
                                </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                            )}
                        />

                        <div className="flex gap-2 ">
                            {type === "sign-in" && (<>
                                <p>No account yet?</p>
                                <Link href="/sign-up" className="text-[#772e25]">Register</Link>
                            </>)}

                            {type === "sign-up" && (<>
                                <p>Already have account?</p>
                                <Link href="/sign-in" className="text-[#772e25]">Login</Link>
                            </>)}
                            
                        </div>
                    </div>
                </div>
        </Form>
    </>
  )
}

export default AuthForm
