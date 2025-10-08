import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
    <header className="main-header-optimized p-2 relative">
            <Image
                src="/background-header.jpg"
                alt="Background Header"
                sizes="100vw"
                fill
                priority
                className=" object-bottom -z-10"
            />   
        <div className="relative z-20 flex items-center max-w-6xl mx-auto">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/pokemon-icon.svg"
                    alt="Pokedex"
                    className="cursor-pointer dark:invert"
                    width={150}
                    height={40}
                    priority
                ></Image>
            </Link>
        </div>
    </header>
    );
  }