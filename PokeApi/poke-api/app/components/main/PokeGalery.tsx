import getPokemon from "../../data/pokeData";
import CardPokemon from "../layouts/CardPokemon";
import PokemonModal from "../layouts/PokemonModal";
import { useEffect, useState } from "react";

interface Pokemon {
    id: number;
    name: string;
    types: string;
    sprites: string;
}

const PokeGalery = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
    
    // Estados de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;

    // useEffect que se ejecuta cada vez que cambia la página
    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const offset = (currentPage - 1) * itemsPerPage;
                const { pokemon: pokemonData, totalCount } = await getPokemon({
                    limit: itemsPerPage,
                    offset: offset
                });
                
                setPokemon(pokemonData);
                setTotalPages(Math.ceil(totalCount / itemsPerPage));
            } catch (error) {
                console.error("Error al obtener los datos", error);
                setError(error as any);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemon();
    }, [currentPage]); // ⭐ Se ejecuta cada vez que currentPage cambia

    if (loading){
        return(
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-bold">Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-bold text-red-500">Error al cargar los pokémon</p>
            </div>
        );
    }
    
    return (
        <section className="container mx-auto p-4">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-center">Galería de Pokémon</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pokemon.map((pokemon: any) => (
                    <CardPokemon 
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.types}
                        sprites={pokemon.sprites}
                        onClick={() => setSelectedPokemonId(pokemon.id)}
                    />
                ))}
            </div>

            {/* Paginación */}
            <div className="mt-8 flex justify-center items-center gap-2">
                {/* Botón Anterior */}
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                    ← Anterior
                </button>

                {/* Números de página */}
                <div className="flex gap-1">
                    {/* Primera página */}
                    {currentPage > 3 && (
                        <>
                            <button
                                onClick={() => setCurrentPage(1)}
                                className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                            >
                                1
                            </button>
                            {currentPage > 4 && <span className="px-2 py-2">...</span>}
                        </>
                    )}

                    {/* Páginas cercanas a la actual */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = Math.max(1, currentPage - 2) + i;
                        if (pageNumber > totalPages) return null;
                        
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`px-3 py-2 rounded transition ${
                                    currentPage === pageNumber
                                        ? 'bg-blue-500 text-white font-bold'
                                        : 'bg-white border border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    {/* Última página */}
                    {currentPage < totalPages - 2 && (
                        <>
                            {currentPage < totalPages - 3 && <span className="px-2 py-2">...</span>}
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </div>

                {/* Botón Siguiente */}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                    Siguiente →
                </button>
            </div>

            {/* Información de página */}
            <div className="text-center mt-4 text-gray-600">
                Página {currentPage} de {totalPages} ({pokemon.length} pokémon mostrados)
            </div>

            {/* Modal de detalles */}
            <PokemonModal 
                pokemonId={selectedPokemonId}
                onClose={() => setSelectedPokemonId(null)}
            />
        </section>
    );
}

export default PokeGalery;
