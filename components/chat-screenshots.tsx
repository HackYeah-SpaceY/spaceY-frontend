"use client";

import { useGetChat } from "@/lib/queries";
import Image from "next/image";

export function ChatScreenshots({ id }: { id: string }) {
  const history = useGetChat(id);

  if (history.isPending)
    return (
      <div className="flex items-center justify-center min-h-64">
        Loading...
      </div>
    );

  if (history.isError)
    return (
      <div className="flex items-center justify-center min-h-64">
        An error occured.
      </div>
    );

  console.log(history.data.screenshots);

  return (
    <div className="p-6 flex flex-col gap-y-9 max-h-[600px] pt-12 overflow-y-auto">
      {history.data?.screenshots?.map(
        (his: { createdAt: string; filePath: string; id: string }) => (
          <Image
            key={his.id}
            width={500}
            height={300}
            src={his.filePath}
            alt="Screenshot of what AI Sees"
          />
        )
      )}
    </div>
  );
}
