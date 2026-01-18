
"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Events =[
    {
      'title':" what is tech",
      'date':"october 06,2026",
      'department':"Engineering",
      'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
    },
    {
      'title':" what is tech",
      'date':"october 06,2026",
      'department':"Engineering",
      'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
    },
    {
      'title':" what is tech",
      'date':"october 06,2026",
      'department':"Engineering",
      'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
    },
    {
      'title':" what is tech",
      'date':"october 06,2026",
      'department':"Engineering",
      'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
    },
    {
      'title':" what is tech",
      'date':"october 06,2026",
      'department':"Engineering",
      'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
    },
    {
      'title':" what is tech",
      'date':"october 06,2026",
      'department':"Engineering",
      'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
    },
  ]

function Eventcompunent() {
  const router = useRouter();

  return (
    <div
      className="
        w-full
        grid
        gap-1.5
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      {Events.map((post, i) => (
        <div
          key={i}
          className="
            card
            bg-white dark:bg-card
            shadow-gray-200
            p-2
            rounded
            flex
            flex-col
          "
        >
          {/* IMAGE */}
          <img
            src={post.image}
            alt="card-image"
            className="
              w-full
              h-40
              object-cover
              rounded
            "
          />

          {/* TEXT */}
          <div
            className="
              cardText
              w-full
              space-y-1
              md:space-y-1.5
              mt-2
              flex-1
            "
          >
            <h2 className="md:text-2xl lg:text-auto">{post.title}</h2>
            <p>{post.date}</p>
            <span className="w-auto bg-gray-100 dark:bg-background py-1 px-2 rounded inline-block">
              {post.department}
            </span>
          </div>

          {/* BUTTON */}
          <div
            className="
              cardButton
              w-full
              flex
              justify-center
              items-center
              mt-2
            "
          >
            <Button
              variant={"card"}
              className="w-full"
              onClick={() => router.push(`/details/${i}`)}
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Eventcompunent;
