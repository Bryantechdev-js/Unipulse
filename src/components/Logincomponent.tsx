"use client";

import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { loginAction } from "@/action/loginAction";
import { toast } from "sonner";
import { loginValidation } from "@/utils/ZodSchemas";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

function Logincomponent() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginValidation),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onsubmit = async (data: any) => {
    const result = await loginAction(data);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success(result.message);
    if(result.role === 'STUDENT'){
      router.push('/')
      return;
    }
    if(result.role === 'ADMIN'){
      router.push('/Admin')
      return;
    }

    router.push('/staff')

    console.log(data);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Login to UniPulse
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Welcome back! Please enter your details.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="john.doe@unipulse.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-black"
              />
              {errors.email?.message && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-black"
              />
              {errors.password?.message && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-muted-foreground">
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="LECTURER">Lecturer</SelectItem>
                      <SelectItem value="OFFICE">Office</SelectItem>
                      <SelectItem value="MANAGEMENT">Management</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role?.message && (
                <p className="text-red-600 text-sm mt-1">{errors.role.message as string}</p>
              )}
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-red-700 hover:text-red-800">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2.5 rounded-lg hover:bg-red-800 transition-colors font-medium"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="/register" className="text-red-700 hover:text-red-800">
              Register
            </a>
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            <a href="#" className="text-gray-600 hover:text-gray-900 underline">
              Contact admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Logincomponent;