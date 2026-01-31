import React from 'react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
function Userprofile() {
    const imageLink = false
  return (
    <div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
            {imageLink ? <Image className='rounded-full' width={6} height={6} src={"/vercel.svg"} alt='profile-image'/> : <Button variant="outline" size="icon" className=" bg-background text-red-200 dark:text-white">{"MB"} </Button>}
        
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <p>Name: <span>Bryan-tech</span></p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p>Email: <span>bryantech.dev@gmail.com</span></p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p>Password: <span className='opacity-0'>jack@test</span></p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p>Password: <span className='opacity-0'>jack@test</span></p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button  className='w-full'>
            logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}

export default Userprofile;
