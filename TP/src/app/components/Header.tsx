import Image from "next/image";

export default function Header() {
    return (
    <header className="bg-blue-500 p-4">
        <div className="flex items-center">
            <Image
                src="/pokemon-icon.svg"
                alt="Pokedex"
                className="cursor-pointer dark:invert"
                width={50}
                height={50}
                priority
            ></Image>
            <h1 className="text-3xl font-bold underline pl-5">Aca va un titulo !</h1>
        </div>
    </header>
    );
  }