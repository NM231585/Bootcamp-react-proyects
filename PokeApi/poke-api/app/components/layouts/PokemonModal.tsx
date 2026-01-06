import { useEffect, useState } from "react";
import axios from "axios";

interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: string[];
    abilities: string[];
    stats: {
        name: string;
        value: number;
    }[];
    sprites: {
        front_default: string;
        front_shiny: string;
        back_default: string;
    };
}

interface PokemonModalProps {
    pokemonId: number | null;
    onClose: () => void;
}

const PokemonModal = ({ pokemonId, onClose }: PokemonModalProps) => {
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // useEffect que se ejecuta cada vez que pokemonId cambia
    useEffect(() => {
        // Si no hay pokemonId, no hacer nada
        if (!pokemonId) {
            setPokemon(null);
            return;
        }

        // Función para obtener los detalles completos del pokémon
        const fetchPokemonDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
                );

                const data = response.data;

                const pokemonDetails: PokemonDetails = {
                    id: data.id,
                    name: data.name,
                    height: data.height,
                    weight: data.weight,
                    types: data.types.map((type: any) => type.type.name),
                    abilities: data.abilities.map((ability: any) => ability.ability.name),
                    stats: data.stats.map((stat: any) => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    })),
                    sprites: {
                        front_default: data.sprites.front_default,
                        front_shiny: data.sprites.front_shiny,
                        back_default: data.sprites.back_default
                    }
                };

                setPokemon(pokemonDetails);
            } catch (err) {
                setError("Error al cargar los detalles del Pokémon");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [pokemonId]); // ⭐ Se ejecuta cada vez que pokemonId cambia

    // Si no hay pokemonId, no mostrar el modal
    if (!pokemonId) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {loading && (
                    <div className="p-8 text-center">
                        <p className="text-xl font-semibold">Cargando detalles...</p>
                    </div>
                )}

                {error && (
                    <div className="p-8 text-center">
                        <p className="text-xl font-semibold text-red-500">{error}</p>
                        <button 
                            onClick={onClose}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Cerrar
                        </button>
                    </div>
                )}

                {pokemon && !loading && (
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
                            <button 
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Sprites */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center">
                                <img 
                                    src={pokemon.sprites.front_default} 
                                    alt={`${pokemon.name} frontal`}
                                    className="w-32 h-32 mx-auto"
                                />
                                <p className="text-sm text-gray-600">Normal</p>
                            </div>
                            <div className="text-center">
                                <img 
                                    src={pokemon.sprites.front_shiny} 
                                    alt={`${pokemon.name} shiny`}
                                    className="w-32 h-32 mx-auto"
                                />
                                <p className="text-sm text-gray-600">Shiny</p>
                            </div>
                            <div className="text-center">
                                <img 
                                    src={pokemon.sprites.back_default} 
                                    alt={`${pokemon.name} trasera`}
                                    className="w-32 h-32 mx-auto"
                                />
                                <p className="text-sm text-gray-600">Atrás</p>
                            </div>
                        </div>

                        {/* Info básica */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-100 p-4 rounded">
                                <p className="text-sm text-gray-600">ID</p>
                                <p className="text-xl font-bold">#{pokemon.id}</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                <p className="text-sm text-gray-600">Altura</p>
                                <p className="text-xl font-bold">{pokemon.height / 10} m</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                <p className="text-sm text-gray-600">Peso</p>
                                <p className="text-xl font-bold">{pokemon.weight / 10} kg</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                <p className="text-sm text-gray-600 mb-2">Tipos</p>
                                <div className="flex gap-2 flex-wrap">
                                    {pokemon.types.map((type, index) => (
                                        <span 
                                            key={index}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize"
                                        >
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Habilidades */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-3">Habilidades</h3>
                            <div className="flex gap-2 flex-wrap">
                                {pokemon.abilities.map((ability, index) => (
                                    <span 
                                        key={index}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg capitalize"
                                    >
                                        {ability.replace('-', ' ')}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Estadísticas */}
                        <div>
                            <h3 className="text-xl font-bold mb-3">Estadísticas Base</h3>
                            <div className="space-y-3">
                                {pokemon.stats.map((stat, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-semibold capitalize">
                                                {stat.name.replace('-', ' ')}
                                            </span>
                                            <span className="text-sm font-bold">{stat.value}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${(stat.value / 255) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonModal;
