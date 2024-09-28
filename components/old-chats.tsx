"use client";

import { getOldChats } from "@/lib/queries";
import Link from "next/link";

export function OldChats() {
  const chats = getOldChats();

  return chats?.data?.map((chat: any) => {
    return (
      <div className="flex" key={chat.id}>
        <Link
          className="flex justify-center flex-col items-center px-4 my-1 hover:bg-[#4d5055]/50"
          href={`/main/${chat.id}`}
        >
          <button key={chat.id}>
            <div className="text-[#EDEDED] font-semibold text-sm">
              {chat.title}
            </div>
          </button>
        </Link>
        <div className="h-[80%] my-auto ml-4 mr-4 w-[1px] bg-[#EDEDED]"></div>
      </div>
    );
  });
}
