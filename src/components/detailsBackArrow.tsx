import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function detailsBackArrow() {
    const router = useRouter();
  return (
    <div>
         <div className="p-6 text-center text-muted-foreground">
        <p>Event not found</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          Go Back
        </Button>
      </div>
    </div>
  );
}


