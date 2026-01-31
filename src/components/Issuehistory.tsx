import { AlertCircle, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import React from "react";

function Issuehistory({ issues }: { issues: any }) {
  const issuesHistory = issues.filter(
    (issue: any) => issue.status.toLowerCase() === "closed".toLowerCase(),
  ) ?? [];

  if(issuesHistory.length ===  0) return (
    <div>
      <div className="bg-white dark:bg-background rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold  text-gray-900 dark:text-muted-foreground mb-4">
          Issue History
        </h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium   text-gray-900 dark:text-muted-foreground">
                No completed issues yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="bg-white dark:bg-background rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold  text-gray-900 dark:text-muted-foreground mb-4">
          Issue History
        </h2>
        {issuesHistory.map((issue: any) => (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium   text-gray-900 dark:text-muted-foreground">
                  Issue Submitted
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Projector reported not working in Lecture Hall A.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  2023-10-25 10:00 AM
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Issuehistory;
