"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const Events =[
//     {
//       'title':" what is tech",
//       'date':"october 06,2026",
//       'department':"Engineering",
//       'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
//     },
//     {
//       'title':" what is tech",
//       'date':"october 06,2026",
//       'department':"Engineering",
//       'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
//     },
//     {
//       'title':" what is tech",
//       'date':"october 06,2026",
//       'department':"Engineering",
//       'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
//     },
//     {
//       'title':" what is tech",
//       'date':"october 06,2026",
//       'department':"Engineering",
//       'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
//     },
//     {
//       'title':" what is tech",
//       'date':"october 06,2026",
//       'department':"Engineering",
//       'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
//     },
//     {
//       'title':" what is tech",
//       'date':"october 06,2026",
//       'department':"Engineering",
//       'image':"https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg"
//     },
//   ]

function Eventcompunent({ post }: { post: any }) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  console.log("this is the post recieved", post);
  const newPost =search != "" ? post.filter((post: any) =>
    post.category.toLowerCase().includes(search.toLowerCase())
  ) : post;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-bolder">
        Campus Events
      </h1>
      <p className="text-xl sm:text-1.4xl lg:text-2xl">
        Discover exiting events and activities that happens on campus
      </p>
      <div className="wrapper w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <p>Filter by Depertment:</p>

          <Select value={search} onValueChange={(value)=>setSearch(value)}>
            <SelectTrigger>
              <SelectValue
                className="text-[1rem]"
                placeholder="All Department"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup >
                <SelectLabel>Department</SelectLabel>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Biomedical">Biomedical</SelectItem>
                <SelectItem value="Medical Lab">Medical Lab</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <input
          type="date"
          name="date"
          id="date"
          className="w-5 h-5 rounded-full hover:text-red-200"
        ></input>
      </div>

      <p>Upcoming Events</p>
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
        {newPost.map((post: any, i: number) => (
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
              px-2
            "
            >
              <h2 className="md:text-2xl lg:text-auto">{post.title}</h2>
              <p>{post.date}</p>
              <span className="w-auto bg-gray-100 dark:bg-background py-1 px-2 rounded inline-block">
                {post.category}
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
                onClick={() => router.push(`/details/${post?.id}`)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Eventcompunent;
