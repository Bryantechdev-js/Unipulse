"use client";

import React from "react";

interface SkeletonLoaderProps {
  count?: number; // How many skeleton items to show
  type?: "card" | "list" | "table"; // Skeleton type
}

export default function SkeletonLoader({
  count = 5,
  type = "card",
}: SkeletonLoaderProps) {
  const items = Array.from({ length: count });

  if (type === "list") {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <div
            key={i}
            className="w-full h-12 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead>
            <tr>
              {Array.from({ length: 5 }).map((_, i) => (
                <th key={i} className="p-2 bg-gray-200 dark:bg-gray-700">
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <td key={j} className="p-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // default: card type
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((_, i) => (
        <div
          key={i}
          className="w-full h-64 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
        ></div>
      ))}
    </div>
  );
}
