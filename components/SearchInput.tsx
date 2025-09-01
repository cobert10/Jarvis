"use client"

import React, { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils"


const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(()=>{
    const delayDebounceFn = setTimeout(()=> {
      if(searchQuery){
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, {scroll: false})
      }else {
        if(pathname=== '/companions'){
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          })
          router.push(newUrl, {scroll: false})
        }
      }
    },500)
},[searchQuery, router ,searchParams, pathname]);

  return (
    <div className="relative border border-black  bg-white rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="serach" width={12} height={12}></Image>
      <Input placeholder="Search your companion" className=" !bg-white !focus-visible:border-ring-0 focus-visible:ring-ring-0 border-none focus-visible:ring-0 " value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
    </div>
  )
}

export default SearchInput
