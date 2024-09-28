import { ArchiveIcon } from "lucide-react";
import { OldChats } from "./old-chats";
import { AddChat } from "./add-chat";

export function Navbar() {
  return (
    <div className="w-full max-w-full overflow-x-scroll flex h-20 bg-[#313235]">
      <button className="min-w-16 flex mr-4 items-center justify-center h-full bg-[#EDEDED]">
        <ArchiveIcon size={32} />
      </button>

      <AddChat />

      <OldChats />
    </div>
  );
}
