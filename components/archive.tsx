"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { ArchiveIcon, ArrowUpRight } from "lucide-react";
import { useArchiveChat, useGetOldChats } from "@/lib/queries";
import Link from "next/link";
import { toast } from "sonner";

export function Archive({ id }: { id?: string }) {
  const chats = useGetOldChats();

  const archiveChatMutation = useArchiveChat(id || "undefined");

  if (chats.isLoading)
    return (
      <button
        disabled
        className="min-w-16 flex mr-4 items-center justify-center h-full bg-[#EDEDED]"
      >
        <ArchiveIcon size={32} />
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
          <ArchiveIcon size={32} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <h1 className="text-xl font-semibold">Archived Chats</h1>

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
