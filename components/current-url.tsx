"use client";

import { useGetChat } from "@/lib/queries";
import { Globe } from "lucide-react";

export function CurrentURL({ id, url }: { id?: string; url?: string }) {
  const chat = useGetChat(id);

  const finalText = chat.data?.url
    ? chat.data.url
    : url
    ? url
    : "No website specified.";

  return (
    <div className="w-[80%] h-full  mx-auto pt-8">
      <div className="w-full h-12 flex">
        <div className="w-16 flex items-center justify-center h-full bg-[#313235]">
          <Globe size={24} color="#EDEDED" />
        </div>
        <div className="w-full h-full text-[#313235] flex items-center pl-4 font-semibold bg-[#EDEDED]">
          {finalText}
        </div>
      </div>
    </div>
  );
}
