import PokeGalery from "../components/main/PokeGalery";
import SearchPokemon from "../components/main/SearchPokemon";

export function Welcome() {
  return (
    <>
    <h1 className="text-4xl font-bold text-center my-6">Pokémon App</h1>
    <SearchPokemon />
    <hr className="my-8 border-t-2 border-gray-300" />
    <PokeGalery />
    </>
  );
}

