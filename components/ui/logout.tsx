"use client";

import { logout } from "@/lib/actions";

export function Logout() {
  return (
    <button onClick={async () => await logout()} className="hover:underline">
      Log out
    </button>
  );
}
