"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Detailbutton from "@/components/Detailbutton";

const Events = [
  {
    title: "What is Tech",
    date: "October 06, 2026",
    department: "Engineering",
    image:
      "https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg",
    description:
      "This event introduces students to modern technology trends, career paths, and real-world applications in software and engineering.",
    venue: "Main Auditorium",
    time: "10:00 AM – 1:00 PM",
  },
  {
    title: "What is Tech",
    date: "October 06, 2026",
    department: "Engineering",
    image:
      "https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg",
    description:
      "This event introduces students to modern technology trends, career paths, and real-world applications in software and engineering.",
    venue: "Main Auditorium",
    time: "10:00 AM – 1:00 PM",
  },
  {
    title: "What is Tech",
    date: "October 06, 2026",
    department: "Engineering",
    image:
      "https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg",
    description:
      "This event introduces students to modern technology trends, career paths, and real-world applications in software and engineering.",
    venue: "Main Auditorium",
    time: "10:00 AM – 1:00 PM",
  },
  {
    title: "What is Tech",
    date: "October 06, 2026",
    department: "Engineering",
    image:
      "https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg",
    description:
      "This event introduces students to modern technology trends, career paths, and real-world applications in software and engineering.",
    venue: "Main Auditorium",
    time: "10:00 AM – 1:00 PM",
  },
  {
    title: "What is Tech",
    date: "October 06, 2026",
    department: "Engineering",
    image:
      "https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg",
    description:
      "This event introduces students to modern technology trends, career paths, and real-world applications in software and engineering.",
    venue: "Main Auditorium",
    time: "10:00 AM – 1:00 PM",
  },
  {
    title: "What is Tech",
    date: "October 06, 2026",
    department: "Engineering",
    image:
      "https://www.theforage.com/blog/wp-content/uploads/2022/09/tech-companies.jpg",
    description:
      "This event introduces students to modern technology trends, career paths, and real-world applications in software and engineering.",
    venue: "Main Auditorium",
    time: "10:00 AM – 1:00 PM",
  },
];

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const event = Events[Number(id)];

  if (!event) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>Event not found</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* IMAGE */}
      <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border border-border">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TITLE */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          {event.title}
        </h1>
        <p className="text-muted-foreground">
          {event.date} • {event.department}
        </p>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-card text-card-foreground rounded-lg p-4 border border-border space-y-2">
        <h2 className="font-medium">About this event</h2>
        <p className="leading-relaxed text-muted-foreground">
          {event.description}
        </p>
      </div>

      {/* META INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetaCard label="Date" value={event.date} />
        <MetaCard label="Time" value={event.time} />
        <MetaCard label="Department" value={event.department} />
        <MetaCard label="Venue" value={event.venue} />
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Detailbutton/>
      </div>
    </div>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted rounded-lg p-3 border border-border">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}
