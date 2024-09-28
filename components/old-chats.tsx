export function OldChats() {
  const chats = [
    { id: 1, url: "hifi.ng", description: "Checking the price" },
    { id: 2, url: "google.com", description: "Searching" },
  ];

  return chats.map((chat) => {
    return (
      <>
        <button
          key={chat.id}
          className="flex justify-center flex-col items-center px-4 my-1 hover:bg-[#4d5055]/50"
        >
          <div className="text-[#EDEDED] text-sm">{chat.url}</div>
          <div className="text-[#EDEDED] font-semibold text-sm">
            {chat.description}
          </div>
        </button>
        <div className="h-[80%] my-auto ml-4 w-[1px] bg-[#EDEDED]"></div>
      </>
    );
  });
}
