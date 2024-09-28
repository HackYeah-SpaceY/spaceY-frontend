"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createChat } from "@/lib/queries";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function ChatInputForm() {
  const searchParams = useSearchParams();

  const url = searchParams.get("addChat");

  const createChatMutation = createChat();

  const [input, setInput] = useState<string>("");

  const handleClick = (e: Event) => {
    e.preventDefault();

    createChatMutation.mutate({
      url: url,
      content: input,
    });
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
        onClick={(e: any) => handleClick(e)}
        className="absolute right-4 hover:bg-transparent"
        variant={"ghost"}
      >
        <Send />
      </Button>
    </form>
  );
}
