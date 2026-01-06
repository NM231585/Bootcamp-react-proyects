import { useState, useEffect } from "react";
import axios from "axios";
import CardPokemon from "../layouts/CardPokemon";

interface Pokemon {
    id: number;
    name: string;
    types: string;
    sprites: string;
}

const SearchPokemon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // useEffect que se ejecuta cada vez que searchTerm cambia
    useEffect(() => {
        // Si el campo está vacío, no hacer nada
        if (!searchTerm.trim()) {
            setPokemon(null);
            setError(null);
            return;
        }

        // Función para buscar el pokémon
        const searchPokemon = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
                );
                
                const pokemonData = {
                    id: response.data.id,
                    name: response.data.name,
                    types: response.data.types.map((type: any) => type.type.name).join(', '),
                    sprites: response.data.sprites.front_default
                };
                
                setPokemon(pokemonData);
            } catch (err) {
                setError("Pokémon no encontrado. Intenta con otro nombre o ID.");
                setPokemon(null);
            } finally {
                setLoading(false);
            }
        };

        // Debounce: esperar 500ms después de que el usuario deje de escribir
        const timeoutId = setTimeout(() => {
            searchPokemon();
        }, 500);

        // Cleanup: cancelar la búsqueda anterior si el usuario sigue escribiendo
        return () => clearTimeout(timeoutId);
        
    }, [searchTerm]); // Se ejecuta cada vez que searchTerm cambia

    return (
        <section className="container mx-auto p-4">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-center mb-4">Buscar Pokémon</h2>
                
                <div className="max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Busca por nombre o ID (ej: pikachu, 25)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            </div>

            {/* Estado de carga */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <p className="text-xl font-semibold text-gray-600">Buscando...</p>
                </div>
            )}

            {/* Mensaje de error */}
            {error && (
                <div className="flex justify-center items-center py-10">
                    <p className="text-xl font-semibold text-red-500">{error}</p>
                </div>
            )}

            {/* Resultado de la búsqueda */}
            {pokemon && !loading && (
                <div className="flex justify-center">
                    <div className="w-full max-w-sm">
                        <CardPokemon
                            id={pokemon.id}
                            name={pokemon.name}
                            types={pokemon.types}
                            sprites={pokemon.sprites}
                        />
                    </div>
                </div>
            )}

            {/* Mensaje inicial */}
            {!searchTerm && !pokemon && !loading && (
                <div className="flex justify-center items-center py-10">
                    <p className="text-lg text-gray-500">
                        Escribe el nombre o ID de un Pokémon para comenzar
                    </p>
                </div>
            )}
        </section>
    );
};

export default SearchPokemon;
