import { Logo } from "@/components/logo";
import { SignUpForm } from "@/components/signup-form";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getSession();

  if (session) return redirect("/main");

  return (
    <div className="flex flex-col w-fit mx-auto gap-y-12 items-center justify-center min-h-[100dvh]">
      <Logo />

      <SignUpForm />
    </div>
  );
}
