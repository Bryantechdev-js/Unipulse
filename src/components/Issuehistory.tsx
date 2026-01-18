import { AlertCircle, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import React from 'react';

function Issuehistory() {
  return (
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

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium   text-gray-900 dark:text-muted-foreground">
                        Assigned to IT Department
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Issue reviewed and forwarded to the IT support team for
                        resolution.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        2023-10-25 02:30 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium   text-gray-900 dark:text-muted-foreground">
                        Technician Dispatched
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        IT Technician John Doe dispatched to Lecture Hall A to
                        assess the issue.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        2023-10-26 09:15 AM
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium   text-gray-900 dark:text-muted-foreground">
                        Initial Diagnosis
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Diagnosed as a faulty HDMI cable. Replacement ordered.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        2023-10-26 11:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  );
}

export default Issuehistory;
