import { Suggestioncard } from "@/components/Suggestioncard";
import { Suggestionform } from "@/components/Suggestionform";

export default function Page() {
  return (
    <div className="w-full px-3 sm:px-6 bg-gray-50 dark:bg-background">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-muted-foreground">
        Campus Improvement Suggestions
      </h1>

      <div
        className="
          mt-7
          flex flex-col
          lg:flex-row
          gap-4
          w-full
          min-h-screen
        "
      >
        {/* Form */}
        <div className="w-full lg:flex-1">
          <Suggestionform />
        </div>

        {/* Cards */}
        <div className="w-full lg:w-[600px]">
          <Suggestioncard />
        </div>
      </div>
    </div>
  );
}
