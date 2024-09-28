import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Globe, Send } from "lucide-react";

export default function Main() {
  return (
    <div className="w-full flex flex-col min-h-[100dvh] ">
      <Navbar />

      <div className="w-[80%] h-full  mx-auto pt-8">
        <div className="w-full h-12 flex">
          <div className="w-16 flex items-center justify-center h-full bg-[#313235]">
            <Globe size={24} color="#EDEDED" />
          </div>
          <div className="w-full h-full text-[#313235] flex items-center pl-4 font-semibold bg-[#EDEDED]">
            hifi.ng
          </div>
        </div>
      </div>

      <div className="flex gap-x-8 flex-1 py-8 w-[80%] mx-auto">
        <div className="min-h-[80%] w-full bg-[#EDEDED]"></div>
        <div className="min-h-full relative w-full bg-[#EDEDED]">
          <div className="absolute w-full flex items-center justify-between bottom-0 left-0">
            <Input
              className="w-full flex justify-between items-center  px-4 font-sans border-2 p-2 h-10 rounded-none border-[#313235] "
              placeholder="What action to perform on the website?"
            />
            <Send className="absolute right-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
