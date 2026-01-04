import { useEffect, useState } from "react";
import axios from "axios";

export default function RandomDog() {
    const [dog, setDog] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fechDog = async () => {
        try {
            const response = await axios.get("https://dog.ceo/api/breeds/image/random");
            setDog(response.data.message);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fechDog();
    }, []);

    return (
            <div className="w-full p-4 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center text-white">Imagen Random de perro</h2>
                <div className="flex justify-center">
                    <button 
                    onClick={fechDog} 
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                    >{loading ? "Cargando..." : "Obtener Perro al Azar"}
                    </button>
                </div>

                {loading && (
                    <div className="w-full p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg">
                        <p className="text-blue-700 font-medium">Cargando...</p>
                    </div>
                )}

                {error && (
                    <div className="w-full p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
                        <p className="text-red-700 font-medium">Error: {error}</p>
                    </div>
                )}
                
                {dog && (
                    <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                        <img 
                            src={dog} 
                            alt="Random Dog" 
                            className="w-screen aspect-square object-cover hover:scale-105 transition-transform duration-300 h-[400px] " 
                        />
                    </div>
                )}
            </div>
    );
}