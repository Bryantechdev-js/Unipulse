import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AssignmentDetailsPage() {
  return (
    <div className="min-h-screen flex justify-center bg-background">
      <main className="w-full md:w-[80%] px-4 md:px-0 py-10 space-y-8">
        
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Data Structures – Assignment 1
          </h1>
          <p className="text-muted-foreground text-sm">
            Course: Data Structures • Department: Engineering
          </p>
        </header>

        <Separator />

        {/* Meta Info */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-medium">Lecturer</p>
            <p className="text-muted-foreground">Dr. John Doe</p>
          </div>

          <div>
            <p className="font-medium">Due Date</p>
            <p className="text-muted-foreground">October 20, 2026 — 11:59 PM</p>
          </div>

          <div>
            <p className="font-medium">Submission Format</p>
            <p className="text-muted-foreground">PDF / DOCX</p>
          </div>
        </section>

        <Separator />

        {/* Assignment Description */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Assignment Description</h2>
          <p className="leading-relaxed text-muted-foreground">
            In this assignment, you are required to implement fundamental
            data structures such as linked lists, stacks, and queues.
            You will analyze their time and space complexity and provide
            clear documentation for your implementation.
          </p>
        </section>

        {/* Instructions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Use any programming language of your choice.</li>
            <li>Well-documented code is mandatory.</li>
            <li>Submit a single compressed file if multiple files are used.</li>
            <li>Late submissions may attract penalties.</li>
          </ul>
        </section>

        {/* Resources */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Supporting Materials</h2>
          <ul className="text-blue-600 underline space-y-1">
            <li>Assignment Brief (PDF)</li>
            <li>Sample Input Files</li>
          </ul>
        </section>

        <Separator />

        {/* Submission Action */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Make sure your submission follows the guidelines before uploading.
          </p>
            <a href="/student/assigment/[id]/submit">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Submit Assignment
              </Button>
            </a>
        </section>

      </main>
    </div>
  );
}
