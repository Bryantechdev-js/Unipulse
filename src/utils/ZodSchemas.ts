import { z } from "zod";
import { de } from "zod/v4/locales";

export const registerValidation = z.object({
  name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  role: z.enum([
    "STUDENT",
    "LECTURER",
    "OFFICE",
    "MANAGEMENT",
    "ADMIN",
  ]),
  matricle: z
    .string()
    .min(8, "Matricule is required")
    .optional(),
  department: z.enum([
    "ENGINEERING",
    "DENTAL THERAPY",
    "AGRICULTURE",
    "HEALTH",
  ]).optional(),
  level: z.enum([
    "LEVEL_100",
    "LEVEL_200",
    "LEVEL_300",
    "LEVEL_400",
  ]).optional(),
});

export type RegisterFormData = z.infer<typeof registerValidation>;

export const loginValidation = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
    role: z.enum([
      "STUDENT",
      "LECTURER",
      "OFFICE",
      "MANAGEMENT",
      "ADMIN",
    ]),
});


// Event creation zod validations

export const eventValidation = z
  .object({
    title: z.string().min(4, "Event title is required"),
    description: z.string().min(10, "Event description is required"),

    // from <input type="date">
    date: z
      .string()
      .min(1, "Event date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),

    // from <input type="time">
    time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),

    location: z.string().min(4, "Event location is required"),
    category: z.string().min(4, "Event category is required"),
    image: z.string().url("Enter a valid image URL"),
  })
  .superRefine((data, ctx) => {
    const [hours, minutes] = data.time.split(":").map(Number);

    const eventDateTime = new Date(data.date);
    eventDateTime.setHours(hours, minutes, 0, 0);

    if (eventDateTime.getTime() < Date.now()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Event date and time cannot be in the past",
        path: ["time"],
      });
    }
  });

  export const issueSchemaValidation = z.object({
    category:z.enum(['Technical Issue','Facility Maintenance','Academic Support']),
    description:z.string().min(10, "Issue description is required and min 10 character"),
    image:z.string().url("Enter a valid image URL"),
    anonymous:z.boolean() 
  })


  export const suggestionSchemaValidation = z.object({
    title:z.string().min(7, "Suggestion title is required and min 7 character"),
    description:z.string().min(10, "Suggestion description is required and min 10 character"),
    category:z.enum(['Technical Issue','Facility Maintenance','Academic Support']),
    image:z.string().url("Enter a valid image URL").optional(),
    anonymous:z.boolean()
  })


  export const createAssignmentValidation = z.object({
    title: z.string().min(5, "Assignment title is required"),
    department:z.string().min(3, "Assignment department is required"),
    course:z.string().min(3, "Assignment course is required"),
// from <input type="date">
    date: z
      .string()
      .min(1, "Event date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
      image:z.string().optional(),
    time:z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    instructions:z.string().min(10, "Assignment instructions are required"),
    submissionFormat:z.string().min(1, "Assignment submission format is required"),
  })


  // utils/ZodSchemas/attendance.ts
// import { z } from "zod";

export const checkInValidation = z.object({
  staffName: z.string().min(2),
  role: z.string(),
  staffType: z.string(),
  department: z.string(),
});

export const checkOutValidation = z.object({
  attendanceId: z.string(),
});
