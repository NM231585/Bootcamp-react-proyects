import { useEffect, useState } from "react";
import axios from "axios";

export function SelectBreeds() {
    // Estado para la lista de todas las razas disponibles
    const [allBreeds, setAllBreeds] = useState<string[]>([]);
    // Estado para la raza seleccionada por el usuario
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    // Estado para la imagen de la raza seleccionada
    const [breedImage, setBreedImage] = useState<string | null>(null);
    // Estados de carga y error
    const [loadingBreeds, setLoadingBreeds] = useState<boolean>(true);
    const [loadingImage, setLoadingImage] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch para obtener la lista de todas las razas al montar el componente
    const fetchAllBreeds = async () => {
        setLoadingBreeds(true);
        setError(null);
        try {
            const response = await axios.get("https://dog.ceo/api/breeds/list/all");
            const breedsData = response.data.message;
            // Convertir el objeto de razas a un array
            const breedsArray = Object.keys(breedsData);
            setAllBreeds(breedsArray);
            setLoadingBreeds(false);
        } catch (error: any) {
            setError(error.message);
            setLoadingBreeds(false);
        }
    };

    // Fetch para obtener una imagen de la raza seleccionada
    const fetchBreedImage = async (breed: string) => {
        if (!breed) return;
        
        setLoadingImage(true);
        setError(null);
        try {
            const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
            setBreedImage(response.data.message);
            setLoadingImage(false);
        } catch (error: any) {
            setError(error.message);
            setLoadingImage(false);
        }
    };

    // Cargar las razas al montar el componente
    useEffect(() => {
        fetchAllBreeds();
    }, []);

    // Manejar el submit del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedBreed) {
            fetchBreedImage(selectedBreed);
        }
    };

    // Manejar el cambio en el select
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(e.target.value);
    };

    return (
        <section className="w-full p-4">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6 text-white">
                    Buscar por Raza
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="raza" 
                            className="text-lg font-semibold text-white"
                        >
                            Selecciona una raza:
                        </label>
                        
                        {loadingBreeds ? (
                            <p className="text-gray-300">Cargando razas...</p>
                        ) : (
                            <select 
                                name="raza" 
                                id="raza"
                                value={selectedBreed}
                                onChange={handleSelectChange}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                                disabled={loadingBreeds}
                            >
                                <option value="">-- Selecciona una raza --</option>
                                {allBreeds.map((breed) => (
                                    <option key={breed} value={breed}>
                                        {breed.charAt(0).toUpperCase() + breed.slice(1)}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <button 
                        type="submit"
                        disabled={!selectedBreed || loadingImage}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                        {loadingImage ? "Cargando imagen..." : "Ver Imagen"}
                    </button>
                </form>

                {/* Mensajes de error */}
                {error && (
                    <div className="mt-4 w-full p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
                        <p className="text-red-700 font-medium">Error: {error}</p>
                    </div>
                )}

                {/* Mostrar la imagen de la raza seleccionada */}
                {breedImage && (
                    <div className="mt-6 w-full overflow-hidden rounded-2xl shadow-lg">
                        <img 
                            src={breedImage} 
                            alt={`${selectedBreed} dog`}
                            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="p-4 bg-gray-100">
                            <p className="text-center font-semibold text-lg capitalize">
                                {selectedBreed}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}