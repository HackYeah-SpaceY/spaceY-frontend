import { getSession } from "@/lib/get-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) return redirect("/signin");

  return children;
}
