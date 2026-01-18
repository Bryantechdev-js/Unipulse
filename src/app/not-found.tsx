"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // fade in the main container
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      // animate the text
      gsap.from(textRef.current, {
        opacity: 0,
        y: 20,
        delay: 0.3,
        duration: 0.8,
        ease: "power2.out",
      });

      // animate subtle dots floating around
      gsap.to(dotsRef.current?.children, {
        y: "-=10",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div
        ref={containerRef}
        className="max-w-lg w-full text-center space-y-6 relative"
      >
        {/* Floating dots animation */}
        <div
          ref={dotsRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 pointer-events-none"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-red-400 opacity-70"
              style={{
                left: `${i * 20 + 10}%`,
                top: `${i * 10 + 5}%`,
              }}
            ></div>
          ))}
        </div>

        {/* Main Text */}
        <div ref={textRef} className="space-y-3 z-10 relative">
          <h1 className="text-5xl font-extrabold text-red-600 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl font-semibold">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            This page is not part of the UniPulse academic records.
            <br />
            The link may be broken, outdated, or no longer available.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 z-10 relative">
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
          <Button variant="outline" onClick={() => router.push("/events")}>
            View Campus Events
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground pt-6 relative z-10">
          UniPulse • Official University Communication System
        </p>
      </div>
    </div>
  );
}
