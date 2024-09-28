import { Logout } from "@/components/ui/logout";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) return redirect("/signin");

  return (
    <div>
      {children}
      <Logout />
    </div>
  );
}
