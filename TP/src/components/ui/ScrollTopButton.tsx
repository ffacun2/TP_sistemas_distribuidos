"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button"; // Reutilizamos tu componente de botón

export function ScrollTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth", 
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);

		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []); 

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={scrollToTop}
			className={`
        fixed bottom-5 right-5 h-12 w-12 rounded-full
        shadow-lg transition-opacity duration-300 cursor-pointer hover:scale-110
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
			aria-label="Volver al inicio de la página"
		>
			<ArrowUp className="h-6 w-6" />
		</Button>
	);
}
