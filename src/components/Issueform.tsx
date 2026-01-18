"use client";

import { Upload } from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';
import FileUploader from './FileUploader';

function Issueform() {
  return (
    <div>
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-muted-foreground mb-4">
                  Report a New Issue
                </h2>

                <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">
                          Category
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2   outline-none transition-all bg-white dark:bg-card">
                          <option>Select an issue category</option>
                          <option>Technical Issue</option>
                          <option>Facility Maintenance</option>
                          <option>Academic Support</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">
                          Description
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Provide a detailed description of the issue..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2  outline-none transition-all resize-none"
                        />
                      </div>
                      <div className='flex space-x-1 items-center'>
                        <span className='dark:text-muted-foreground'>anonymous: </span>
                         <Input type='checkbox' className='w-3 h-3 mt-1'/>
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
                          {/* <FileUploader/> */}
                        </button>
                        {/* <FileUploader/> */}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-red-700 text-white py-2.5 rounded-lg hover:bg-red-800 transition-colors font-medium"
                      >
                        Submit Issue
                      </button>
                </form>
        </div>
    </div>
  );
}

export default Issueform;
