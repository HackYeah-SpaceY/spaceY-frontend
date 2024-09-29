import { ArchiveIcon, ArrowUpRight } from "lucide-react";
import { OldChats } from "./old-chats";
import { AddChat } from "./add-chat";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <div className="w-full max-w-full overflow-x-scroll flex h-20 bg-[#313235]">
      <Popover>
        <PopoverTrigger asChild>
          <button className="min-w-16 flex mr-4 items-center justify-center h-full bg-[#EDEDED]">
            <ArchiveIcon size={32} />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <h1 className="text-xl font-semibold">Archived Chats</h1>

          <button className="hover:bg-slate-400/20 px-1 py-2 rounded-md w-full transition-all flex items-center justify-between">
            <div>Helloooo</div>

            <div>
              <ArrowUpRight />
            </div>
          </button>

          <button className="hover:bg-slate-400/20 px-1 py-2 rounded-md w-full transition-all flex items-center justify-between">
            <div>This was a important page</div>

            <div>
              <ArrowUpRight />
            </div>
          </button>

          <button className="hover:bg-slate-400/20 px-1 py-2 rounded-md w-full transition-all flex items-center justify-between">
            <div>Hidden</div>

            <div>
              <ArrowUpRight />
            </div>
          </button>

          <div className="w-[100%] my-2 h-[1px] bg-black mx-auto"></div>

          <Button className="w-full">Archive Current Chat</Button>
        </PopoverContent>
      </Popover>

      <AddChat />

      <OldChats />
    </div>
  );
}
