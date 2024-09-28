import { Navbar } from "@/components/navbar";
import { Globe } from "lucide-react";

export default function Main() {
  return (
    <div className="w-full min-h-[100dvh] ">
      <Navbar />

      <div className="w-[80%]  min-h-[calc(100dvh-64px)] mx-auto pt-16">
        <div className="w-full h-12  flex  ">
          <div className="w-16 flex items-center justify-center h-full bg-[#313235]">
            <Globe size={24} color="#EDEDED" />
          </div>
          <div className="w-full h-full text-[#313235] flex items-center pl-4 font-semibold bg-[#EDEDED]">
            hifi.ng
          </div>
        </div>

        <div className="flex gap-x-8 min-h-full bg-black">
          <div className="min-h-full w-full bg-[#EDEDED]"></div>
          <div className="min-h-full w-full bg-[#EDEDED]"></div>
        </div>
      </div>
    </div>
  );
}
