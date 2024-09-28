import { z } from "zod";

export const emailSchema = z
  .string({ message: "Email must be a string." })
  .min(0, { message: "Email should be longer than 0 character." });

// We can do a better schema
export const passwordSchema = z
  .string({ message: "Password must be a string." })
  .min(0, { message: "Password should be longer than 0 character." })
  .max(256, { message: "Password cannot be longer than 256 characters." });
