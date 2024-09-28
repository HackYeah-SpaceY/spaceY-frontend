import { Logo } from "@/components/logo";
import { SignInForm } from "@/components/signin-form";
import { getSession } from "@/lib/get-session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession();

  if (session) return redirect("/main");

  return (
    <div className="flex flex-col w-fit mx-auto gap-y-12 items-center justify-center min-h-[100dvh]">
      <Logo />
      <SignInForm />
      <Link href={"/signup"} className="text-slate-400">
        Don't have an account? <span className="text-black">Sign Up</span>.
      </Link>
    </div>
  );
}
