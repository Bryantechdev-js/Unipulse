"use client";

import { Upload } from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';
// import FileUploader from './FileUploader';
import { useForm } from 'react-hook-form';
import { UploadButton } from '@uploadthing/react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchemaValidation } from '@/utils/ZodSchemas';
import { submiteIssueAction } from '@/action/submiteIssueAction';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
// import { submiteIssueAction } from '@/action/submiteIssueAction';

function Issueform() {
  const router = useRouter()
  const {register,handleSubmit,setValue,watch,control,formState:{errors,isSubmitting}} = useForm(
    {
      resolver: zodResolver(issueSchemaValidation),
      mode: "onChange",
      reValidateMode: "onChange",
    }
  )
  
  const onsubmit=async(data:any)=>{
    console.log("issure",data);
    const result = await submiteIssueAction(data)
    if(!result?.success){
      toast.error(result?.error ?? "there is an issue")
      return;
    }

    toast.success(result.message)
    router.refresh()
  }
  return (
    <div>
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-muted-foreground mb-4">
                  Report a New Issue
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">
                          Category
                        </label>
                        <select {...register('category')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2   outline-none transition-all bg-white dark:bg-card">
                          <option>Select an issue category</option>
                          <option>Technical Issue</option>
                          <option>Facility Maintenance</option>
                          <option>Academic Support</option>
                        </select>
                      </div>
                        <p className='text-red-600'>{errors.category?.message}</p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">
                          Description
                        </label>
                        <textarea
                        {...register('description')}
                          rows={4}
                          placeholder="Provide a detailed description of the issue..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2  outline-none transition-all resize-none"
                        />
                      </div>
                        <p className='text-red-600'>{errors.description?.message}</p>
                      <div className='flex space-x-1 items-center'>
                        <span className='dark:text-muted-foreground'>anonymous: </span>
                         <Input type='checkbox' className='w-3 h-3 mt-1' {...register('anonymous')}/>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">
                          Supporting Image (Optional)
                        </label>
                   
                          <UploadButton
                          endpoint="issueUploader"
                          onClientUploadStart={() => {
                            toast.success("uploading...")
                          }}
                          onClientUploadComplete={(res:any) => {
                            // Do something with the response
                            setValue('image',res[0].url)
                            toast.success("uploaded successfully")
                            console.log("Files: ", res);
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                            toast.error("upload failed")
                            console.log("Error: ", error);
                          }}
                            className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700">
                          <Upload className="w-4 h-4" />
                          <span>Choose File</span>
                          {/* <FileUploader/> */}
                          </UploadButton>
                      
                        {/* <FileUploader/> */}
                      </div>
                          <p className='text-red-600'>{errors.image?.message}</p>
                      <button
                        type="submit"
                        className="w-full bg-red-700 text-white py-2.5 rounded-lg hover:bg-red-800 transition-colors font-medium"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Issue"}
                      </button>
                </form>
        </div>
    </div>
  );
}

export default Issueform;
