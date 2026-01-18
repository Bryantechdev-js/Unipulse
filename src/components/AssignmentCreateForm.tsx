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

export default function AssignmentCreateForm() {
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

        <CardContent className="space-y-6">
          {/* Assignment Title */}
          <div className="space-y-2">
            <Label>Assignment Title</Label>
            <Input placeholder="e.g. Data Structures – Assignment 1" />
          </div>

          {/* Department & Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Course</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ds">Data Structures</SelectItem>
                  <SelectItem value="algo">Algorithms</SelectItem>
                  <SelectItem value="db">Databases</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label>Submission Deadline</Label>
            <div className="flex gap-2">
              <Input type="date" />
              <Input type="time" />
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label>Assignment Instructions</Label>
            <Textarea rows={5} placeholder="Provide clear instructions..." />
          </div>

          {/* Supporting Files */}
          <div className="space-y-2">
            <Label>Supporting Files (Optional)</Label>
            <div className="border border-dashed rounded-md p-6 text-center text-muted-foreground">
              Upload assignment brief, datasets, or reference files
            </div>
          </div>

          {/* Submission Format */}
          <div className="space-y-2">
            <Label>Allowed Submission Format</Label>
            <Select>
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
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Save Draft</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Publish Assignment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
