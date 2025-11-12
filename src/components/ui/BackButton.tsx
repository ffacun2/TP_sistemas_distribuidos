"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
	const router = useRouter();

	return (
		<Button
			variant="ghost"
			onClick={() => router.back()}
			className="mb-4 p-2 flex items-center cursor-pointer hover:text-foreground hover:border-gray-300 hover:border-2"
		>
			<ArrowLeft className="mr-2 h-4 w-4" />
			Volver
		</Button>
	);
}
