"use client";

import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LockIcon, UserIcon } from "lucide-react";
import { passwordSchema, usernameSchema } from "@/lib/validations";
import { toast } from "sonner";

export function SignUpForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const passwordAgain = formData.get("passwordAgain");

    const usernameParsed = usernameSchema.safeParse(username);
    const passwordParsed = passwordSchema.safeParse(password);
    const passwordAgainParsed = passwordSchema.safeParse(password);

    if (usernameParsed.error || passwordParsed.error) {
      usernameParsed?.error?.errors.forEach((error) => {
        toast.warning(error.message);
      });

      passwordParsed?.error?.errors.forEach((error) => {
        toast.warning(error.message);
      });

      return;
    }

    if (password !== passwordAgain) {
      toast.warning("Passwords does not match.");

      return;
    }

    // Authenticate user in here with fetch

    const isAuthenticated = true;

    if (isAuthenticated) {
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <UserIcon size={48} />
        <Input name="username" placeholder="Username" />
      </div>

      <div className="flex items-center gap-x-4">
        <LockIcon size={48} />
        <Input type="password" name="password" placeholder="Password" />
      </div>

      <div className="flex items-center gap-x-4">
        <LockIcon size={48} />
        <Input
          type="password"
          name="passwordAgain"
          placeholder="Password Again"
        />
      </div>

      <Button className="px-24 py-8">SIGN UP</Button>
    </form>
  );
}
