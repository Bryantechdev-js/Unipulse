import SubmitAssignmentForm from "@/components/SubmitAssignmentForm";

export default function SubmitAssignmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          {/* Page Header */}
          <header className=" text-muted-foreground px-6 sm:px-8 md:px-12 py-8 md:py-10">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Submit Assignment
              </h1>
              <p className="text-red-100 text-base sm:text-lg">
                Data Structures – Assignment 1
              </p>
            </div>
          </header>

          {/* Content Area */}
          <div className="px-6 sm:px-8 md:px-12 py-8 md:py-10 space-y-8">
            
            {/* Deadline Info */}
            <div className="rounded-lg border-2 border-red-300 bg-red-50 dark:bg-red-950/20 px-6 py-5 shadow-sm">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm sm:text-base">
                    <span className="font-bold text-red-700 dark:text-red-600">
                      Submission Deadline:
                    </span>{" "}
                    <span className="font-semibold text-red-900 dark:text-red-400">
                      October 20, 2026 at 11:59 PM
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm text-red-600 dark:text-red-500 mt-1">
                    Late submissions will not be accepted
                  </p>
                </div>
              </div>
            </div>

            {/* Assignment Details Card */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Assignment Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Course:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">Data Structures</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Assignment:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">Assignment 1</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Total Points:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">100</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Format:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">PDF only</span>
                </div>
              </div>
            </div>

            {/* Submission Form */}
            <SubmitAssignmentForm />

            {/* Guidelines */}
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-3">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submission Guidelines
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2 ml-7">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Ensure your PDF is clearly readable and properly formatted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Include your name and student ID on every page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Maximum file size is 10MB</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>You can resubmit before the deadline (latest submission will be graded)</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}