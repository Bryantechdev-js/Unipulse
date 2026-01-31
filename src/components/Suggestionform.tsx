"use client";

import { Upload } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { suggestionSchemaValidation } from "@/utils/ZodSchemas";
import { suggestionActiion } from "@/action/suggestionAction";
import { useRouter } from "next/navigation";

export function Suggestionform() {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm(
    {
      resolver: zodResolver(suggestionSchemaValidation),
      mode: "onChange",
      reValidateMode: "onChange",
    }
  );
  const router = useRouter();
  const onsubmit = async (data: any) => {
    const result = await suggestionActiion(data);
    if(!result.success){
      toast.error(result.error)
      return;
    }
    toast.success(result.message)
    router.refresh()
    reset()
    console.log("suggestion data", data);
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Submit Your suggestions
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <div>
            <label>Title:</label>
            <Input {...register("title")} placeholder="suggestions title.." />
          </div>
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          <div>
            <label>Description:</label>
            <Textarea
              className="min-h-[120px]"
              {...register("description")}
            />
          </div>
          {errors.description && (<p className="text-red-500">{errors.description.message}</p>)}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full px-3 py-2 border bg-card rounded-lg outline-none"
            >
              <option value="">Select a category</option>
              <option>Technical Issue</option>
              <option>Facility Maintenance</option>
              <option>Academic Support</option>
            </select>
          </div>
          {errors.category && (<p className="text-red-500">{errors.category.message}</p>)}
          <div className="flex items-center gap-2">
            <span className="text-sm dark:text-muted-foreground">
              Anonymous
            </span>
            <Input
              type="checkbox"
              {...register("anonymous")}
              className="w-4 h-4"
            />
          </div>
            {errors.anonymous && (<p className="text-red-500">{errors.anonymous.message}</p>)}
          <div>
            <label className="block text-sm font-medium mb-1">
              Supporting Image (Optional)
            </label>

            <UploadButton
              endpoint="suggestionUploader"
              onUploadBegin={() => toast.success("uploading..")}
              onClientUploadComplete={(res) => {
                setValue("image", res[0].url);
                toast.success("uploaded successfully");
              }}
              onUploadError={() => toast.error("upload failed")}
              className="w-full px-3 py-2 border rounded-lg flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Choose File</span>
            </UploadButton>
          </div>
              {errors.image && (<p className="text-red-500">{errors.image.message}</p>)}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2.5 rounded-lg hover:bg-red-800 transition-colors font-medium"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
