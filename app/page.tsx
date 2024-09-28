import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session) return redirect("/main");

  return (
    <div className="flex flex-col gap-y-16 items-center justify-center min-h-[100dvh]">
      <Logo />

      <div className="flex flex-col items-center gap-y-8">
        <Link href={"/signin"}>
          <Button className="px-24 py-6 font-bold">SIGN IN</Button>
        </Link>

        <Link href={"/signup"}>
          <Button className="px-24 py-6 font-bold">SIGN UP</Button>
        </Link>
      </div>
    </div>
  );
}
