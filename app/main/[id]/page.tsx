import { ChatHistory } from "@/components/chat-history";
import { ChatInputForm } from "@/components/chat-input-form";
import { CurrentURL } from "@/components/current-url";
import { Navbar } from "@/components/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Main({ params }: { params: { id: string } }) {
  const id = params.id;

  const token = cookies()?.get("accessToken")?.value;

  const chatFetch = await fetch(
    `https://spaceywebapi-development.up.railway.app/chats/${id}`,
    {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (chatFetch.status !== 200) return redirect("/main");

  const response = await chatFetch.json();

  return (
    <div className="w-full flex flex-col min-h-[100dvh] ">
      <Navbar />

      <CurrentURL url={response.url} />

      <div className="flex gap-x-8 flex-1 py-8 w-[80%] mx-auto">
        <div className="min-h-[80%] w-full bg-[#EDEDED]"></div>
        <div className="min-h-full relative w-full bg-[#EDEDED]">
          <ChatHistory history={response.messages} />

          <ChatInputForm />
        </div>
      </div>
    </div>
  );
}
