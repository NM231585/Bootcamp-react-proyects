interface CardPokemonProps {
    id: number;
    name: string;
    types: string;
    sprites: string;
    onClick?: () => void;
}

const CardPokemon = ({id, name, types, sprites, onClick }: CardPokemonProps) => {
    return (
        <div 
            className="card bg-white border-2 border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer hover:scale-105"
            onClick={onClick}
        >
            <div className="flex justify-center mb-3">
                <img className="w-32 h-32" src={sprites} alt={name} />
            </div>
            <div className="text-center">
                <h2 className="text-xl font-bold capitalize mb-2">{name}</h2>
                <p className="text-sm text-gray-600 mb-1">ID: #{id}</p>
                <div className="flex justify-center gap-2 flex-wrap">
                    {types.split(', ').map((type: string, index: number) => (
                        <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CardPokemon;