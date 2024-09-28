import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session) return redirect("/main");

  return (
    <div className="flex flex-col gap-y-16 items-center justify-center min-h-[100dvh]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        LOGO
      </h1>

      <div className="flex flex-col items-center gap-y-8">
        <Link href={"/signin"}>
          <Button className="px-24 py-8 font-bold">SIGN IN</Button>
        </Link>

        <Link href={"/signup"}>
          <Button className="px-24 py-8 font-bold">SIGN UP</Button>
        </Link>
      </div>
    </div>
  );
}
