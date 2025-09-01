"use client"

import React, { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { subjects } from "@/constants"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') || '';
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(()=>{
    let newUrl = ""
    if(searchQuery === "all"){
          newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          })
          router.push(newUrl, {scroll: false})
        
      }
    else{
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: searchQuery,
        });
      router.push(newUrl, {scroll: false})
      }
  },[searchQuery, router ,searchParams, pathname]);
  
  return (
    <Select
        onValueChange = {setSearchQuery}
        value = {searchQuery}
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
  )
}

export default SubjectFilter
