
export default function PokemonesLayout({ children }: { children: React.ReactNode }) { 
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                {children}
            </div>
        </div>
    );
}