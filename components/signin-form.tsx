"use client";

import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LockIcon, UserIcon } from "lucide-react";
import { emailSchema, passwordSchema } from "@/lib/validations";
import { toast } from "sonner";
import { useSignIn } from "@/lib/queries";

export function SignInForm() {
  const signInMutation = useSignIn();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

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

    signInMutation.mutate({
      email: emailParsed.data,
      password: passwordParsed.data,
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <UserIcon size={48} />
        <Input name="email" required placeholder="Email" type="email" />
      </div>

      <div className="flex items-center gap-x-4">
        <LockIcon size={48} />
        <Input
          type="password"
          name="password"
          required
          placeholder="Password"
        />
      </div>

      <Button
        disabled={signInMutation.isPending}
        type="submit"
        className="px-24 py-6 font-bold"
      >
        SIGN IN
      </Button>
    </form>
  );
}
