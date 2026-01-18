import Eventsidebar from "@/components/Eventsidebar";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Navigation,
  Upload,
} from "lucide-react";
import React from "react";
import Issueform from "../../components/Issueform";
import Resentissues from "@/components/Resentissues";
import Issuehistory from "@/components/Issuehistory";

function page() {
  
  return (
    <div>
      <div className="flex min-h-screen bg-gray-50 dark:bg-background ">
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-muted-foreground">
                Issue Submission & Tracking
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
                <Issueform/>

              <Resentissues/>

              <Issuehistory/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
