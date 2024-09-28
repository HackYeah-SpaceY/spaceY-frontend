"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCreateChat } from "@/lib/queries";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ChatInputForm() {
  const searchParams = useSearchParams();

  const url = searchParams.get("addChat");

  const isAddingChat = !!url;

  const createChatMutation = useCreateChat();

  const [input, setInput] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (createChatMutation.data?.chatId) {
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
      // Update with id and content
    }
  };

  return (
    <form className="absolute w-full flex items-center justify-between bottom-0 left-0">
      <Input
        onChange={(e) => setInput(e.target.value)}
        required
        className="w-full flex justify-between items-center  px-4 font-sans border-2 p-2 h-10 rounded-none border-[#313235] "
        placeholder="What action to perform on the website?"
      />
      <Button
        disabled={createChatMutation.isPending}
        onClick={(e) => handleClick(e)}
        className="absolute right-4 hover:bg-transparent"
        variant={"ghost"}
      >
        <Send />
      </Button>
    </form>
  );
}
