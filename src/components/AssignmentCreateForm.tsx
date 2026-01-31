"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAssignmentValidation } from "@/utils/ZodSchemas";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { createAssignmentAction } from "@/action/createAssignmentAction";

export default function AssignmentCreateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createAssignmentValidation),
    mode: "onChange",
    defaultValues: {
      image: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("CREATE ASSIGNMENT DATA:", data);
    const result = await createAssignmentAction(data)

    if(!result.success){
      toast.error(result.error  || "Failed to create assignment");
      return;
    }

    toast.success(result.message || "Assignment created successfully");
    reset()
  };

  return (
    <div className="flex justify-center items-start px-4 py-8">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            Create Assignment
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Create and publish assignments for your students
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label>Assignment Title</Label>
              <Input {...register("title")} />
              {errors.title && (
                <p className="text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Department & Course */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>

                <Controller
                  control={control}
                  name="department"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ENGINEERING">
                          ENGINEERING
                        </SelectItem>
                        <SelectItem value="DENTAL THERAPY">
                          DENTAL THERAPY
                        </SelectItem>
                        <SelectItem value="AGRICULTURE">
                          AGRICULTURE
                        </SelectItem>
                        <SelectItem value="HEALTH">HEALTH</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.department && (
                  <p className="text-red-600">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Course</Label>
                <Input {...register("course")} />
                {errors.course && (
                  <p className="text-red-600">{errors.course.message}</p>
                )}
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label>Submission Deadline</Label>
              <div className="flex gap-2">
                <Input type="date" {...register("date")} />
                <Input type="time" {...register("time")} />
              </div>
              {(errors.date || errors.time) && (
                <p className="text-red-600">
                  {errors.date?.message || errors.time?.message}
                </p>
              )}
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <Label>Assignment Instructions</Label>
              <Textarea {...register("instructions")} rows={5} />
              {errors.instructions && (
                <p className="text-red-600">
                  {errors.instructions.message}
                </p>
              )}
            </div>

            {/* Upload */}
            <div className="space-y-2">
              <Label>Supporting Files (Optional)</Label>
              <UploadButton
                endpoint="createAssignmentUploader"
                onUploadBegin={() => toast.message("Uploading...")}
                onClientUploadComplete={(res) => {
                  setValue("image", res[0].url, {
                    shouldValidate: true,
                  });
                  toast.success("Upload complete");
                }}
                onUploadError={(error:any) =>
                  toast.error("Upload failed")
                }
              >
                <div className="border border-dashed rounded-md p-6 text-center text-muted-foreground">
                  Upload assignment files
                </div>
              </UploadButton>

              {errors.image && (
                <p className="text-red-600">{errors.image.message}</p>
              )}
            </div>

            {/* Submission Format */}
            <div className="space-y-2">
              <Label>Allowed Submission Format</Label>

              <Controller
                control={control}
                name="submissionFormat"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="doc">DOC / DOCX</SelectItem>
                      <SelectItem value="zip">ZIP</SelectItem>
                      <SelectItem value="any">Any File</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.submissionFormat && (
                <p className="text-red-600">
                  {errors.submissionFormat.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button">
                Save Draft
              </Button>

              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Publish Assignment"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
