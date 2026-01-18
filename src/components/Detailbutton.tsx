import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Detailbutton() {
    const router = useRouter();
  return (
    <div>
      <Button variant="destructive" className="w-full sm:w-auto" onClick={()=> router.push("/Issue")}>
        Report Issue
      </Button>
    </div>
  );
}

export default Detailbutton;
