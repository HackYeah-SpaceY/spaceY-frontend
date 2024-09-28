import { SignUpForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockIcon, UserIcon } from "lucide-react";

export default function SignUp() {
  return (
    <div className="flex flex-col w-fit mx-auto gap-y-8 items-center justify-center min-h-[100dvh]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        LOGO
      </h1>

      <SignUpForm />
    </div>
  );
}
