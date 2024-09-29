"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { ArrowUpRight, User2 } from "lucide-react";
import { useArchiveChat, useGetOldChats } from "@/lib/queries";
import Link from "next/link";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { Logout } from "./ui/logout";

export function Archive({ id }: { id?: string }) {
  const chats = useGetOldChats();

  const archiveChatMutation = useArchiveChat(id || "undefined");

  const token = useCookies().get("accessToken");

  const decoded = jwtDecode(token || "") as any;

  const email =
    decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];

  if (chats.isLoading)
    return (
      <button
        disabled
        className="min-w-16 flex mr-4 items-center justify-center h-full bg-[#EDEDED]"
      >
        <User2 size={32} />
      </button>
    );
  if (chats.isError) return <div className="text-white">Error</div>;

  const archivedChats = chats.data.filter(
    (chat: { chatId: string; content: string; isArchived: boolean }) =>
      chat.isArchived
  );

  const handleArchive = () => {
    if (id) {
      archiveChatMutation.mutate();
      toast.success("Chat archived!");
    } else {
      toast.error("Please pick a valid chat.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="min-w-16 flex mr-4 items-center justify-center h-full bg-[#EDEDED]">
          <User2 size={32} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[500px]">
        <div className="flex justify-between items-center">
          <div>Welcome, {email}</div>

          <Logout />
        </div>

        <div className="w-[100%] my-2 h-[1px] bg-black mx-auto"></div>

        <div className="text-xl font-semibold">Archived Chats</div>

        {archivedChats.map(
          (archived: { id: string; title: string; isArchived: boolean }) => (
            <Link href={`/main/${archived.id}`} key={archived.id}>
              <button className="hover:bg-slate-400/20 px-1 py-2 rounded-md w-full transition-all flex items-center justify-between">
                <div>{archived.title}</div>

                <div>
                  <ArrowUpRight />
                </div>
              </button>
            </Link>
          )
        )}

        <div className="w-[100%] my-2 h-[1px] bg-black mx-auto"></div>

        <Button
          disabled={archiveChatMutation.isPending}
          onClick={handleArchive}
          className="w-full"
        >
          Archive Current Chat
        </Button>
      </PopoverContent>
    </Popover>
  );
}
