"use server";

import { cookies } from "next/headers";

export async function saveSession(token: string) {
  cookies().set("accessToken", token);

  return true;
}
