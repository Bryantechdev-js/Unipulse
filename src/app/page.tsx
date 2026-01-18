
import Eventcompunent from "@/components/Eventcompunent";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import React from "react";



function page() {
  
  return (
    <div className=" w-full h-full text-black bg-background dark:text-muted-foreground px-8 py-5 space-y-3">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-bolder">
        Campus Events
      </h1>
      <p className="text-xl sm:text-1.4xl lg:text-2xl">Discover exiting events and activities that happens on campus</p>
      <div className="wrapper w-full flex justify-between items-center">
            <div className="flex items-center space-x-2">
        <p>Filter by Depertment:</p>
      
        <Select >
          <SelectTrigger>
            <SelectValue className="text-[1rem]" placeholder="All Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Engineering</SelectItem>
              <SelectItem value="banana">Health</SelectItem>
              <SelectItem value="blueberry">Agriculture</SelectItem>
              <SelectItem value="grapes">Biomedical</SelectItem>
              <SelectItem value="pineapple">Medical Lab</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>
        <input type="date" name="date" id="date" className="w-5 h-5 rounded-full hover:text-red-200">
        </input>
      </div>
  
      <p>Upcoming Events</p>
      <div>
        <Eventcompunent/>
      </div>
    </div>
  );
}

export default page;