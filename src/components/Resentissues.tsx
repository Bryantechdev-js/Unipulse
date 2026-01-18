"use client"

import React, { useState } from 'react';

function Resentissues() {
  const [selected,setSelected] = useState("all")
  return (
    <div>
        
              <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold  text-gray-900 dark:text-muted-foreground">
                    Your Recent Issues
                  </h2>
                </div>

                <div className="flex gap-1 mb-4 text-[0.8rem] bg-gray-100 dark:bg-card  rounded">
                  <button className={`px-1 py-1 ${selected === "all" ? 'shadow bg-white' : ""}   text-gray-700 dark:text-muted-foreground rounded-lg`} onClick={()=>setSelected("all")}>
                    All
                  </button>
                  <button className={`px-1 py-1 ${selected === "open" ? 'shadow bg-white' : ""} rounded-lg text-gray-700 dark:text-muted-foreground`} onClick={()=>setSelected("open")}>
                    Open
                  </button>
                  <button className={`px-1 py-1 ${selected === "progress" ? 'shadow bg-white' : ""} rounded-lg text-gray-700 dark:text-muted-foreground `} onClick={()=>setSelected("progress")}>
                    In Progress
                  </button>
                  <button className={`px-1 py-1 ${selected === "resolve" ? 'shadow bg-white' : ""} rounded-lg text-gray-700 dark:text-muted-foreground`} onClick={()=>setSelected("resolve")}>
                    Resolved
                  </button>
                  <button className={`px-1 py-1 ${selected === "closed" ? 'shadow bg-white' : ""} rounded-lg text-gray-700 dark:text-muted-foreground`} onClick={()=>setSelected("closed")}>
                    Closed
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium    text-gray-900 dark:text-muted-foreground">
                        Projector not working in Lecture Hall A
                      </h3>
                      <span className="text-[0.7rem] w-60 bg-gray-100 dark:bg-card  px-2 py-1 rounded">
                        Technical Issue
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-yellow-600 font-medium">
                        In Progress
                      </span>
                      <span className="text-gray-500 dark:text-muted-foreground ">
                        Submitted: 2023-10-26
                      </span>
                    </div>
                    <div className='flex'>
                    <button className=" cursor-pointer self-end mt-2 text-sm text-red-700 hover:text-red-800 font-medium">
                      View Details
                    </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium  text-gray-900 dark:text-muted-foreground w-28">
                        Leaking faucet in bathroom, North Wing
                      </h3>
                      <span className="text-[0.7rem] w-auto bg-gray-1 dark:bg-card00  px-2 py-1 rounded">
                        Facility Maintenance
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-medium">Open</span>
                      <span className="text-gray-500 dark:text-muted-foreground">
                        Submitted: 2023-10-25
                      </span>
                    </div>
                    <div className='flex'>
                    <button className=" cursor-pointer self-end mt-2 text-sm text-red-700 hover:text-red-800 font-medium">
                      View Details
                    </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium  text-gray-900 dark:text-muted-foreground">
                        Grade discrepancy for Calculus I
                      </h3>
                      <span className="text-[0.7rem] w-60 bg-gray-100 dark:bg-card  px-2 py-1 rounded">
                        Academic Support
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        Resolved
                      </span>
                      <span className="text-gray-500 dark:text-muted-foreground">
                        Submitted: 2023-10-20
                      </span>
                    </div>
                    <div className='flex'>
                    <button className=" cursor-pointer self-end mt-2 text-sm text-red-700 hover:text-red-800 font-medium">
                      View Details
                    </button>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  );
}

export default Resentissues;
