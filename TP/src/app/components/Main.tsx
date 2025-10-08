import PokemonList from "@/app/components/ui/PokemonList"




export default async function Main() {

    return (
        <main className="bg-yellow-400 grow-1 p-4">
            <section className="flex flex-col text-center h-full">
                <h2 className="text-2xl font-bold">Bienvenido a la aplicacion!</h2>
                <section className="flex grow-1 items-center justify-center">
                    <PokemonList/>
                </section>
            </section>
        </main>
    )};


