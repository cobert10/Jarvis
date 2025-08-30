"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Input } from "./ui/input"
import { subjects, teaching_style, voices } from "@/constants"
import { Textarea } from "./ui/textarea"

import { createCompanion } from "@/lib/actions/user.actions"

import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1,  {message: 'Companion name is required.'}),
  subject: z.string().min(1,  {message: 'Subject is required.'}),
  topic: z.string().min(1,  {message: 'Topic is required.'}),
  voice: z.string().min(1,  {message: 'Voice is required.'}),
  style: z.string().min(1,  {message: 'Style is required.'}),
  duration: z.number().min(1,  {message: 'Duration is required.'}),
})

const CompanionForm = () => {
  const router = useRouter();  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:'',
      subject:'',
      topic:'',
      voice:'',
      style:'',
      duration:15,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCompanion({
        name: values.name,
        subject: values.subject,
        topic: values.topic,
        voice: values.voice,
        style: values.style,
        duration: values.duration
    });


    if(companion){
        router.push(`/dashboard/companions/${companion.$id}`)
    }
    else{
        console.log("Failed to create a new companion")
    }
  }

  return (
    <div className="p-5 rounded-lg !text-white !bg-black" >
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Companion name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter the companion name" className="input" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                    <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange = {field.onChange}
                            value = {field.value}
                            defaultValue = {field.value}
                        >
                            <SelectTrigger className="input capitalize">
                                <SelectValue placeholder="Select the Subject"/>
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((subject)=> (
                                    <SelectItem value={subject} key={subject} className="capitalize">{subject}</SelectItem>
                                ))}

                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />

                 <FormField 
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>What kind of topic you want to learn?</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Ex. Sorthing Algorithm" className="input" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="voice"
                    
                    render={({ field }) => (
                    <FormItem>
                    <FormLabel>Voice</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange = {field.onChange}
                            value = {field.value}
                            defaultValue = {field.value}
                        >
                            <SelectTrigger className="input capitalize">
                                <SelectValue placeholder="Select AI voice"/>
                            </SelectTrigger>
                            <SelectContent>
                                {voices.map((voice)=> (
                                    <SelectItem value={voice} key={voice} className="capitalize">{voice}</SelectItem>
                                ))}

                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                
                <FormField 
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                    <FormItem>
                    <FormLabel>Style</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange = {field.onChange}
                            value = {field.value}
                            defaultValue = {field.value}     
                        >
                            <SelectTrigger className="input capitalize !w-[200px]">
                                <SelectValue placeholder="Select teaching style"/>
                            </SelectTrigger>
                            <SelectContent className="w-48">
                                {teaching_style.map((style)=> (
                                    <SelectItem value={style} key={style} className="capitalize">{style}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                    <FormItem>
                    <FormLabel>Duration in Minutes</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Duration in Minutes" className="input"  {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
              

                <Button className="w-full cursor-pointer" type="submit">Build Companion</Button>
            </form>
        </Form>
    </div>
  )
}
export default CompanionForm