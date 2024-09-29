import { ChatHistory } from "@/components/chat-history";
import { ChatInputForm } from "@/components/chat-input-form";
import { CurrentURL } from "@/components/current-url";
import { Navbar } from "@/components/navbar";

export default async function Main({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <div className="w-full flex flex-col min-h-[100dvh] ">
      <Navbar />

      <CurrentURL id={id} />

      <div className="flex gap-x-8 flex-1 py-8 w-[80%] mx-auto">
        <div className="min-h-[80%] w-full bg-[#EDEDED]"></div>
        <div className="min-h-[80%] relative w-full bg-[#EDEDED]">
          <ChatHistory id={id} />

          <ChatInputForm id={id} />
        </div>
      </div>
    </div>
  );
}
