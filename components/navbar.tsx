import { ArchiveIcon, Check, PlusIcon } from "lucide-react";
import { OldChats } from "./old-chats";
import { AddChat } from "./add-chat";

export function Navbar() {
  return (
    <div className="w-full flex h-16 bg-[#313235]">
      <button className="w-16 flex mr-4 items-center justify-center h-full bg-[#EDEDED]">
        <ArchiveIcon size={32} />
      </button>

      <OldChats />

      <AddChat />
    </div>
  );
}
