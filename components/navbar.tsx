import { OldChats } from "./old-chats";
import { AddChat } from "./add-chat";
import { Archive } from "./archive";

export function Navbar({ id }: { id?: string }) {
  return (
    <div className="w-full max-w-full overflow-x-scroll flex h-20 bg-[#313235]">
      <Archive id={id} />

      <AddChat />

      <OldChats />
    </div>
  );
}
