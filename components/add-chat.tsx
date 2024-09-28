"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, PlusIcon } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function AddChat() {
  const [input, setInput] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleAdd(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("addChat", input);
    } else {
      params.delete("addChat");
    }

    replace(`/main/?${params.toString()}`);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className="h-[90%] my-auto hover:bg-transparent flex  items-center justify-center"
        >
          <PlusIcon size={36} color="#EDEDED" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-y-2 w-full">
          <div>Enter website URL</div>
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="border border-[#313235] py-2"
          />
          <Button onClick={() => handleAdd(input)} className="w-fit ml-auto">
            <Check size={24} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
