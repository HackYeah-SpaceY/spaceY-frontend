import { Globe } from "lucide-react";

export function CurrentURL({ url }: { url?: string }) {
  return (
    <div className="w-[80%] h-full  mx-auto pt-8">
      <div className="w-full h-12 flex">
        <div className="w-16 flex items-center justify-center h-full bg-[#313235]">
          <Globe size={24} color="#EDEDED" />
        </div>
        <div className="w-full h-full text-[#313235] flex items-center pl-4 font-semibold bg-[#EDEDED]">
          {url ? url : "No website specified."}
        </div>
      </div>
    </div>
  );
}
