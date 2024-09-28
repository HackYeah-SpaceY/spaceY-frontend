import "server-only";

import { cookies } from "next/headers";

export async function getSession() {
  const accessToken = cookies().get("accessToken");

  if (!accessToken?.value) return null;

  const response = await fetch(
    "https://spaceywebapi-development.up.railway.app/test",
    {
      headers: {
        accept: "*/*",
        authorization: `Bearer ${accessToken.value}`,
      },
    }
  );

  return await response.json();
}
