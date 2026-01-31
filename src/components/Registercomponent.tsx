"use client";

import { BookOpen } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerValidation,
  RegisterFormData,
} from "@/utils/ZodSchemas";
import { registerAction } from "@/action/registerAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Registercomponent() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isLoading },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidation),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      role: "STUDENT",
    },
  });

  const onSubmit =async (data: RegisterFormData) => {
    console.log("✅ FORM DATA READY FOR BACKEND:", data);
    const result = await registerAction(data)
    console.log("result",result);
    

    if(!result.success){
      toast.error(result.error as string)
      return;
    }
    else{
      console.log(result.admin);
      toast.success(result.message)
      router.push("/login")
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
            <BookOpen className="text-white w-6 h-6" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">
          Create UniPulse Account
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Secure university access
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* FULL NAME */}
          <InputField
            label="Full Name"
            error={errors.name?.message}
            {...register("name")}
          />

          {/* EMAIL */}
          <InputField
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* PASSWORD */}
          <InputField
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* ROLE (Controller) */}
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <SelectField
                label="Role"
                error={errors.role?.message}
                {...field}
                options={[
                  { value: "STUDENT", label: "Student" },
                  { value: "LECTURER", label: "Lecturer" },
                  { value: "OFFICE", label: "Office Staff" },
                  { value: "MANAGEMENT", label: "Management" },
                  { value: "ADMIN", label: "Admin" },
                ]}
              />
            )}
          />

          {/* MATRICULE */}
          <InputField
            label="Matricule"
            error={errors.matricle?.message}
            {...register("matricle")}
          />

          {/* DEPARTMENT */}
          <Controller
            control={control}
            name="department"
            render={({ field }) => (
              <SelectField
                label="Department"
                error={errors.department?.message}
                {...field}
                options={[
                  { value: "ENGINEERING", label: "Engineering" },
                  { value: "DENTAL THERAPY", label: "Dental Therapy" },
                  { value: "HEALTH", label: "Health" },
                  { value: "AGRICULTURE", label: "Agriculture" },
                ]}
              />
            )}
          />

          {/* LEVEL */}
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <SelectField
                label="Level"
                error={errors.level?.message}
                {...field}
                options={[
                  { value: "LEVEL_100", label: "Level 100" },
                  { value: "LEVEL_200", label: "Level 200" },
                  { value: "LEVEL_300", label: "Level 300" },
                  { value: "LEVEL_400", label: "Level 400" },
                ]}
              />
            )}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 transition"
          >
            Register Account
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-red-500 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE UI ---------------- */

function InputField({ label, error, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-red-500 outline-none"
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ label, error, options, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        {...props}
        className="w-full mt-1 px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-red-500 outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
