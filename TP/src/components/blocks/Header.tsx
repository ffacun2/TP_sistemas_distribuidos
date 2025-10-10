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
			<div className="max-w-6xl mx-auto">
				<div className="flex items-center">
					<Link href="/" className="relative h-10 w-30">
						<Image
							src="/pokemon-icon.svg"
							alt="Pokedex"
							className="cursor-pointer object-contain dark:invert"
							fill
							priority
						/>
					</Link>
				</div>
			</div>
		</header>
	);
}
