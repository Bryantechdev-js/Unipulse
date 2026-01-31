
import { getEvents } from "@/action/getEvents";
import Eventcompunent from "@/components/Eventcompunent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";



async function page() {
  const posts = await getEvents()
  console.log(posts);
  
  const post = posts.events
  return (
    <div className=" w-full h-full text-black bg-background dark:text-muted-foreground px-8 py-5 space-y-3">
      <div>
        <Eventcompunent post={post}/>
      </div>
    </div>
  );
}

export default page;