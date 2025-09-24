import Image from "next/image";

export default function Footer() {
	return (
		<footer className="bg-blue-500 h-40">
			<Image
				src="/vercel.svg"
				alt="Next.js Logo"
				className="dark:invert"
				width={180}
				height={37}
				priority
			></Image>
		</footer>
	);
}
