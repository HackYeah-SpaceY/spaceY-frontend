"use client";

import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LockIcon, UserIcon } from "lucide-react";
import { emailSchema, passwordSchema } from "@/lib/validations";
import { toast } from "sonner";
import { signUp } from "@/lib/queries";
import Link from "next/link";

export function SignUpForm() {
  const signUpMutation = signUp();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordAgain = formData.get("passwordAgain");

    const emailParsed = emailSchema.safeParse(email);
    const passwordParsed = passwordSchema.safeParse(password);

    if (emailParsed.error || passwordParsed.error) {
      emailParsed?.error?.errors.forEach((error) => {
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

    signUpMutation.mutate({
      email: emailParsed.data,
      password: passwordParsed.data,
      confirmPassword: passwordParsed.data,
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <UserIcon size={48} />
        <Input name="email" placeholder="Email" type="email" />
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

      <Button disabled={signUpMutation.isPending} className="px-24 py-6">
        SIGN UP
      </Button>

      <Link href={"/signin"} className="text-slate-400 mx-auto">
        Have an account? <span className="text-black">Sign In</span>.
      </Link>
    </form>
  );
}
