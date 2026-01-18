"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background p-4">
      {/* Header / Title Skeleton */}
      <div className="w-2/5 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>

      {/* Sub-header Skeleton */}
      <div className="w-1/3 h-6 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>

      {/* Cards Skeleton */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md animate-pulse flex flex-col justify-between p-4"
          >
            {/* Card content skeleton */}
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-4"></div>
          </div>
        ))}
      </div>

      {/* List Skeleton */}
      <div className="w-full max-w-3xl mt-8 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
