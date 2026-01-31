"use client";

import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { deleateSuggestionsAction } from "@/action/deleateSuggestion";
import { toast } from "sonner";
// import { success } from "zod";
// import { error } from "console";
import { useRouter } from "next/navigation";

export function Suggestioncard({suggestions}: {suggestions: any}) {
  const router = useRouter()
  const [search, setSearch] = useState("");
  const deleateSuggestions =async(suggestion:any)=>{
    const result = await deleateSuggestionsAction(suggestion.author === null ? 'ADMIN' : suggestion.author.role, suggestion.author === null ? 'Bryan Tech' : suggestion.author.name,suggestion.id)
    if(!result.success){
      toast.error(result.error || 'Failed to deleate suggestion')
      return;
    }
    router.refresh();
    toast.success(result.message || 'suggestion deleated succefully')
  }
  const sugest = search != "" ?  suggestions.filter((sug: any) => sug.category.toLowerCase().includes(search.toLowerCase()) || sug.status.toLowerCase().includes(search.toLowerCase()) || sug.description.toLowerCase().includes(search.toLowerCase())) : suggestions;
  return (
    <div className="w-full bg-white dark:bg-card">
      {/* Filters */}
      <div
        className="
          flex flex-col
          sm:flex-row
          sm:justify-between
          gap-3
          mb-4 dark:px-3 pt-3
        "
      >
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm dark:text-muted-foreground">Filter by:</p>

          <Select onValueChange={(value)=>setSearch(value)}>
            <SelectTrigger className="w-36 ">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Technical Issue">Technical Issue</SelectItem>
                <SelectItem value="Facility Maintenance">Facility Maintenance</SelectItem>
                <SelectItem value="Academic Support">Academic Support</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value)=>setSearch(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="closed">closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3 dark:p-3  overflow-y-auto lg:max-h-[calc(100vh-140px)]">
        {sugest.map((suggestion: any, i: number) => (
          <div
            key={i}
            className="card dark:shadow-foreground shadow w-full p-3 space-y-2 rounded-lg"
          >
            { suggestion.image && (
              <div className="w-full h-40">
                <img
                  src={suggestion.image}
                  alt={suggestion.title}
                  className="w-full h-full object-cover rounded-lg"
                />
            </div>)}
            <h3 className="text-lg dark:text-muted-foreground sm:text-xl font-semibold">
              {suggestion.title}
            </h3>

            <span className=" w-full justify-between items-center inline-block bg-gray-100 dark:bg-card py-1 px-2 rounded text-sm">
              {suggestion.categories}  <div> author: {suggestion.author === null ? 'anonymous' : (`${suggestion.author.name} : ${suggestion.author.email}`)} </div>
            </span>
            <div>
              role: { suggestion.author === null ? 'anonymous' : suggestion.author.role}
            </div>

            <p className="text-sm text-gray-700 dark:text-muted-foreground">
              {suggestion.description}
            </p>
              <div>
                <span className="inline-block px-2 py-1 text-xs rounded shadow border">
                  {suggestion.status}
                </span>
                <span className="inline-block px-2 py-1 text-xs rounded shadow bg-red-700 cursor-pointer border ml-2" onClick={()=>deleateSuggestions(suggestion)}>
                  deleate
                </span>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
