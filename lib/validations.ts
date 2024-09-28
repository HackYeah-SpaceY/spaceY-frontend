import { z } from "zod";

export const usernameSchema = z
  .string({ message: "Username must be a string." })
  .min(0, { message: "Username should be longer than 0 character." })
  .max(16, { message: "Username cannot be longer than 16 characters." });

// We can do a better schema
export const passwordSchema = z
  .string({ message: "Password must be a string." })
  .min(0, { message: "Password should be longer than 0 character." })
  .max(256, { message: "Password cannot be longer than 256 characters." });
