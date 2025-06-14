import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <Link
        href="/chat/new"
        className="px-3 py-2 bg-white text-black rounded-md ">
        Chat
      </Link>
    </div>
  );
}
