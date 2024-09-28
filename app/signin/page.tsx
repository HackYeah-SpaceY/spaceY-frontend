import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockIcon, UserIcon } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex flex-col w-fit mx-auto gap-y-8 items-center justify-center min-h-[100dvh]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        LOGO
      </h1>

      <form className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <UserIcon size={48} />
          <Input placeholder="Username" />
        </div>

        <div className="flex items-center gap-x-4">
          <LockIcon size={48} />
          <Input placeholder="Password" />
        </div>

        <Button className="px-24 py-8 font-bold">SIGN IN</Button>
      </form>
    </div>
  );
}
