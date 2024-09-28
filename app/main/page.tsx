import { ChatInputForm } from "@/components/chat-input-form";
import { CurrentURL } from "@/components/current-url";
import { Navbar } from "@/components/navbar";

export default function Main({
  searchParams,
}: {
  searchParams?: { addChat: string };
}) {
  const url = searchParams?.addChat;

  return (
    <div className="w-full flex flex-col min-h-[100dvh] ">
      <Navbar />

      <CurrentURL url={url} />

      <div className="flex gap-x-8 flex-1 py-8 w-[80%] mx-auto">
        <div className="min-h-[80%] w-full bg-[#EDEDED]"></div>
        <div className="min-h-full relative w-full bg-[#EDEDED]">
          <ChatInputForm />
        </div>
      </div>
    </div>
  );
}
