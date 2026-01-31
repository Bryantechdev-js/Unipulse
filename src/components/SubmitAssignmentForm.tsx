"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";

export default function SubmitAssignmentForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    
    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        setFile(null);
        return;
      }
      
      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload a PDF file");
      return;
    }

    setUploading(true);
    setError(null);

    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setSubmitted(true);
      // alert("Assignment submitted successfully!");
    }, 2000);
  };

  const handleReset = () => {
    setFile(null);
    setSubmitted(false);
    setError(null);
  };

  if (submitted) {
    return (
      <div className="w-full">
        <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-500 rounded-xl p-8 sm:p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
              <CheckCircle className="text-green-600 dark:text-green-400" size={64} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-300">
              Assignment Submitted Successfully!
            </h3>
            <p className="text-green-700 dark:text-green-400">
              Your file <strong>{file?.name}</strong> has been uploaded
            </p>
            <p className="text-sm text-green-600 dark:text-green-500">
              Submitted on {new Date().toLocaleString()}
            </p>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-400"
          >
            Submit Another File
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full space-y-6">

      {/* Upload Section */}
      <div className="space-y-4">
        <Label className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          Upload Your Assignment
        </Label>

        <div className="w-full border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 sm:p-12 md:p-16 text-center space-y-6 hover:border-red-400 dark:hover:border-red-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
          <div className="flex justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6">
              <FileText className="text-gray-400 dark:text-gray-500" size={64} />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
              Drop your PDF file here or click to browse
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Accepted format: <strong>PDF</strong> • Maximum size: <strong>10MB</strong>
            </p>
          </div>

          <div className="flex justify-center">
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="max-w-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
            />
          </div>
        </div>

        {/* File Status */}
        {file && !error && (
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={24} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                File selected successfully
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 truncate">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <XCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={24} />
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto px-8"
          disabled={uploading || !file}
        >
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={uploading || !file}
          size="lg"
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 text-base font-semibold"
        >
          {uploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Submit Assignment
            </>
          )}
        </Button>
      </div>
    </section>
  );
}