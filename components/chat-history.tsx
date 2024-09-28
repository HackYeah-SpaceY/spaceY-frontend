export function ChatHistory({
  history,
}: {
  history: { content: string; isFromUser: boolean; sentAt: string }[];
}) {
  return (
    <div className="p-6">
      {history.map((his) => (
        <div className="bg-primary text-white p-12 py-4  rounded-md w-fit">
          {his.content}
        </div>
      ))}
    </div>
  );
}
