"use client";

import { useState } from "react";
import { Button } from "./ui/button";
// import { UploadButton } from "@uploadthing/react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventValidation } from "@/utils/ZodSchemas";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { createEvent } from "@/action/createEventAction";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
// import { createEVent } from "@/action/createEventAction";

export default function CreateEventForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    reset,
    formState: { errors , isLoading },
  } = useForm({
    resolver:zodResolver(eventValidation),
    mode: "onChange",
  });

  const onsubmit=async(data:any)=>{
     console.log('form data',data);
     const result = await createEvent(data)
     if(!result?.success){
       toast.error(result?.error || "Something went wrong")
       return;
     }
     toast.success(result?.message)
     reset()
     router.push('/')
  }

  return (
    <form
      className="
        w-full
        bg-card text-foreground
        border border-border
        rounded-2xl
        shadow-sm
        p-6 md:p-8
      "
     onSubmit={handleSubmit(onsubmit)}>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Event Information</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to create an event
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Event Title</label>
          <Input
            type="text"
            {...register('title')}
            placeholder="Tech Seminar 2026"
            className="
              w-full rounded-lg px-4 py-3
              bg-background
              border border-border
              focus:ring-2 focus:ring-red-600
              outline-none
            "
          />
        </div>
        {errors.title && (<p>{errors.title.message}</p>)}

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <Input {...register('category')} type="text" placeholder="type event" />
        </div>
        {errors.category && (<p>{errors.category.message}</p>)}
        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <Input
            type="date"
            className="  w-full rounded-lg px-4 py-3
              bg-background
              border border-border"
            min={new Date().toISOString().split("T")[0]}
            {...register("date")}
          />
        </div>
        {errors.date && (<p>{errors.date.message}</p>)}

        {/* Time */}
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <Input
          {...register('time')}
            type="time"
            className="w-full rounded-lg px-4 py-3
              bg-background
              border border-border"
            {...register("time")}
            min={
              watch("date") === new Date().toISOString().split("T")[0]
                ? new Date().toTimeString().slice(0, 5)
                : undefined
            }
          />
        </div>
          {errors.time && (<p>{errors.time.message}</p>)}
        {/* Location */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
          {...register('location')}
            type="text"
            placeholder="Main Hall / Online"
            className="
              w-full rounded-lg px-4 py-3
              bg-background
              border border-border
            "
          />
        </div>
            {errors.location && (<p>{errors.location.message}</p>)}
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
          {...register('description')}
            rows={4}
            placeholder="Describe the event..."
            className="
              w-full rounded-lg px-4 py-3
              bg-background
              border border-border
              resize-none
            "
          />
        </div>
          {errors.description && (<p>{errors.description.message}</p>)}
        {/* Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Event Banner</label>

          <div
            className="
              border-2 border-dashed border-border
              rounded-xl
              p-6
              text-center
              bg-background
              hover:border-red-600
              transition
            "
          >
            <UploadButton
              endpoint="eventUploader"
              onUploadBegin={()=>toast.success("uploading...")}
              onClientUploadComplete={(res: any) => {
                // Do something with the response
                toast.success('upload completed')
                setValue("image", res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                // toast.dismiss('upload failed')
                toast.error("upload failed")
              }}
            />
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
        <button
          type="button"
          className="
            px-6 py-3 rounded-lg
            border border-border
            bg-background
            hover:bg-muted
            transition
          "
         onClick={()=> reset()}>
          Cancel
        </button>

        <Button
          disabled={isLoading}
          type="submit"
          className="
            px-8 py-3 rounded-lg
             text-white
            font-medium
            disabled:opacity-60
            transition
          "
          variant={"card"}
        >
          {isLoading ? "Publishing..." : "Publish Event"}
        </Button>
      </div>
    </form>
  );
}
