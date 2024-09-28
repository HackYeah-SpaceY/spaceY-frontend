"use client";

import { logout } from "@/lib/actions";

export function Logout() {
  return (
    <button
      onClick={async () => await logout()}
      className="absolute bottom-6 left-4 hover:underline"
    >
      Log out
    </button>
  );
}
