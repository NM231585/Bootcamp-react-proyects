import axios from "axios";

interface GetPokemonParams {
    limit?: number;
    offset?: number;
}

const getPokemon = async ({ limit = 20, offset = 0 }: GetPokemonParams = {}) => {
    // Obtener la lista de pokémon con paginación
    const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonList = response.data.results;
    const totalCount = response.data.count; // Total de pokémon disponibles
    
    // Obtener los detalles completos de cada pokémon
    const pokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon: any) => {
            const details = await axios.get(pokemon.url);
            return {
                id: details.data.id,
                name: details.data.name,
                types: details.data.types.map((type: any) => type.type.name).join(', '),
                sprites: details.data.sprites.front_default
            };
        })
    );
    
    return {
        pokemon: pokemonDetails,
        totalCount
    };
}

export default getPokemon;