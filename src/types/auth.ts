export const ROLES = [
  "STUDENT",
  "LECTURER",
  "OFFICE",
  "MANAGEMENT",
  "ADMIN",
] as const;

export type UserRole = typeof ROLES[number];

export type AuthUser = {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
  department?: string;
  matricle?: string;
};




