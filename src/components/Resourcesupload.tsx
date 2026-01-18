"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UploadResourcesForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [fileType, setFileType] = useState<"image" | "video" | "file">("image");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleUploadComplete = (files: any[]) => {
    setError("");
    setUploadedFiles(files);
    console.log("Uploaded files:", files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || uploadedFiles.length === 0) {
      setError("Please provide a title and upload at least one file.");
      return;
    }
    console.log({ title, description, department, fileType, uploadedFiles });
    alert("Upload successful!");
    // Redirect or save to DB here
  };

  // Properly typed map for TypeScript
  const endpointMap: Record<
    "image" | "video" | "file",
    "imageUploader" | "videoUploader" | "fileUploader"
  > = {
    image: "imageUploader",
    video: "videoUploader",
    file: "fileUploader",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-6xl md:max-w-4xl lg:max-w-5xl p-6 bg-white dark:bg-card rounded-lg shadow-lg flex flex-col space-y-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold  dark:text-muted-foreground text-center">
          Upload Learning Resources
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col">
            <Label htmlFor="title">Resource Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter resource title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Short description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Type */}
          <div className="flex flex-col">
            <Label htmlFor="fileType">File Type</Label>
            <Select value={fileType} onValueChange={(val) => setFileType(val as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="file">file</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="flex flex-col">
            <Label>Upload {fileType}</Label>
            <UploadButton
              endpoint={endpointMap[fileType]}
              onClientUploadComplete={handleUploadComplete}
              multiple
              className="w-full"
            >
              {({ isUploading }) => (
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 justify-center text-foreground dark:text-white"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : `Select ${fileType}`}
                  <Upload className="w-5 h-5" />
                </Button>
              )}
            </UploadButton>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Upload Resource
          </Button>
        </form>
      </div>
    </div>
  );
}
