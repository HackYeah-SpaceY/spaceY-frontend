import Image from "next/image";

export function Logo() {
  return (
    <div className="flex flex-col gap-y-6 items-center">
      <div className="flex items-end">
        <Image alt="Logo" src={"/logo.png"} width={300} height={300} />
        <Image alt="Logo" src={"/IELM.png"} width={40} height={20} />
      </div>

      <div className="text-lg font-light">
        The Interactively Expanded Language Model
      </div>
    </div>
  );
}
