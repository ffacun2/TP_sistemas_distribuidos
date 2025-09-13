import Image from "next/image";

export default function Header() {
    return (
    <header className="bg-blue-500 p-4">
        <div className="flex items-center">
            <Image
                src="/next.svg"
                alt="Next.js Logo"
                className="dark:invert"
                width={180}
                height={37}
                priority
            ></Image>
            <h1 className="text-3xl font-bold underline pl-5">Aca va un titulo !</h1>
        </div>
    </header>
    );
  }