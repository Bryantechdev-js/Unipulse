import { getSuggestionsAction } from "@/action/getSuggestionsAction";
import { Suggestioncard } from "@/components/Suggestioncard";
import { Suggestionform } from "@/components/Suggestionform";
import { toast } from "sonner";

export default async function Page() {
  const result = await getSuggestionsAction()
  if(!result.success){
    toast.error(result.error || 'Failed to load suggestions')
    return;
  }
  // toast.success(result.message);
  const suggestions = result.data;
  console.log(suggestions);
  
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
          <Suggestioncard suggestions={suggestions} />
        </div>
      </div>
    </div>
  );
}
