"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCreateChat, useUpdateChat } from "@/lib/queries";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ChatInputForm({ id }: { id?: string }) {
  const searchParams = useSearchParams();

  const url = searchParams.get("addChat");

  const isAddingChat = !!url;

  const createChatMutation = useCreateChat();
  const updateChatMutation = useUpdateChat();

  const [input, setInput] = useState<string>("");

  const [chatId, setChatId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (createChatMutation.data?.chatId) {
      setChatId(createChatMutation.data.chatId);
      router.replace(`main/${createChatMutation.data.chatId}`);
    }
  }, [createChatMutation.data]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isAddingChat) {
      createChatMutation.mutate({
        url: url,
        content: input,
      });
    } else {
      if (chatId) {
        updateChatMutation.mutate({ chatId: chatId, content: input });
        setInput("");
        return;
      }

      if (id) {
        // Update with id and content
        updateChatMutation.mutate({ chatId: id, content: input });
        setInput("");

        return;
      }
    }
  };

  return (
    <form className="absolute w-full flex items-center justify-between bottom-0 left-0">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
        className="w-full flex justify-between items-center bg-[#EDEDED]  px-4 font-sans border-2 p-2 h-10 rounded-none border-[#313235] "
        placeholder="What action to perform on the website?"
      />
      <Button
        disabled={createChatMutation.isPending || updateChatMutation.isPending}
        onClick={(e) => handleClick(e)}
        className="absolute right-4 hover:bg-transparent"
        variant={"ghost"}
      >
        <Send />
      </Button>

      {(createChatMutation.isPending || updateChatMutation.isPending) && (
        <div className="absolute bottom-0 z-10 animate-[slidein] duration-700 translate-y-0 fill-mode-forwards bg-black text-white rounded-md px-2 py-1 font-semibold">
          Cooking the answer...
        </div>
      )}
    </form>
  );
}
