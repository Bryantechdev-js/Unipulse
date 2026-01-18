import { Upload } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function Suggestionform() {
  return (
    <div className="w-full">
      <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Submit Your suggestions
        </h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="title">Title:</label>
            <Input type="text" placeholder="suggestions title.." />
          </div>

          <div>
            <label>Description:</label>
            <Textarea className="min-h-[120px]" />
          </div>

          <div>
            <label className="block  dark:text-muted-foreground text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full px-3 py-2 border bg-card border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ">
              <option>Select an issue category</option>
              <option>Technical Issue</option>
              <option>Facility Maintenance</option>
              <option>Academic Support</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm dark:text-muted-foreground">Anonymous</span>
            <Input type="checkbox" className="w-4 h-4" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">
              Supporting Image (Optional)
            </label>
            <button
              type="button"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700"
            >
              <Upload className="w-4 h-4" />
              <span>Choose File</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2.5 rounded-lg hover:bg-red-800 transition-colors font-medium"
          >
            Submit Suggestions
          </button>
        </form>
      </div>
    </div>
  );
}
