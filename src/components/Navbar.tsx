import { Bell, BookOpen } from 'lucide-react';
import React from 'react';
import { ModeToggle } from './Mode-toggle';
import Userprofile from './Userprofile';
import { NotificationDropDown } from './notificationDropeDown';
// import { NotificationDropdown } from './notificationDropeDown';

function Navbar() {
  return (
    <nav className=' max-w-full h-18 flex justify-between items-center px-8 bg-background text-muted-foreground border-b-2    shadow-red-400 border-gray-200 sticky top-0 z-50'>
        <div className="logo flex items-center gap-2  px-2">
                <div className="w-8 h-8 bg-red-700 rounded flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-red-400 dark:text-muted-foreground">UniPulse</span>
        </div>
        <div className='flex space-x-5'>
            <div className=''>
                <ModeToggle/>
            </div>
            <div className="right flex space-x-9">
                <div className="notification cursor-pointer flex items-center justify-center rounded-full  w-8 h-8">
                    <NotificationDropDown/>
                </div>
                <div className="profileIcon shadow w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">
                    <Userprofile/>
                </div>
            </div>
        </div>
      
    </nav>
  );
}

export default Navbar;
