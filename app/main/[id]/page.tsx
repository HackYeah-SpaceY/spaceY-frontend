import { ChatHistory } from "@/components/chat-history";
import { ChatInputForm } from "@/components/chat-input-form";
import { CurrentURL } from "@/components/current-url";
import { Navbar } from "@/components/navbar";
import { redirect } from "next/navigation";

export default async function Main({ params }: { params: { id: string } }) {
  const id = params.id;

  const chatFetch = await fetch(
    `https://spaceywebapi-development.up.railway.app/chats/${id}`,
    {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzZXJrYW5AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI0MzYyZmU0OS1kYTZkLTRiZmMtODA3OC1iODUzZTYxZmY3OTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2Vya2FuQGdtYWlsLmNvbSIsImV4cCI6MTcyNzU2MDMzMywiaXNzIjoiaHR0cHM6Ly9zcGFjZXl3ZWJhcGktZGV2ZWxvcG1lbnQudXAucmFpbHdheS5hcHAiLCJhdWQiOiJodHRwczovL3NwYWNleXdlYmFwaS1kZXZlbG9wbWVudC51cC5yYWlsd2F5LmFwcCJ9.hEAPJ1JmX7Xv1JZqNF-HKZlfYn4bRYdSCQKVqHdQU0j6Od-2IykTADRK9rrP7R1VPSAgvrXl_tJUKTNq6UppKQ",
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
