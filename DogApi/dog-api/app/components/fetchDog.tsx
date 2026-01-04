import { useEffect, useState } from "react";
import { ApiDogData } from "../data/ApiDogData";
import axios from "axios";

export function DogBreeds() {
    const [dogBreeds, setDogBreeds] = useState<string | null>(null);

    const fechDogBreeds = async () => {
        try {
            const response = await axios.get("https://dog.ceo/api/breeds/list/all");
            setDogBreeds(response.data.message);
        } catch (error: any) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        fechDogBreeds();
    }, []);
    
    return (
        <section>
            <div className="w-full p-4 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center text-white">Lista de razas de perros</h1>
                <ul className="list-disc list-inside gap-2 w-full h-[400px] overflow-y-scroll rounded-lg border border-gray-200 p-4 bg-gray-700">
                    {dogBreeds && Object.keys(dogBreeds).map((breed) => (
                        <li 
                        key={breed}
                        className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-300">{breed}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function DogBreeds2() {
    const { data, loading, error } = ApiDogData();
    const [dogBreeds, setDogBreeds] = useState<string | null>(null);
    const [loading2, setLoading2] = useState<boolean>(false);
    const [error2, setError2] = useState<string | null>(null);

    const fechDogBreeds = async () => {
        setLoading2(true);
        setError2(null);
        try {
            const response = await axios.get("https://dog.ceo/api/breeds/list/all");
            setDogBreeds(response.data.message);
        } catch (error: any) {
            setError2(error.message);
            setLoading2(false);
        } finally {
            setLoading2(false);
        }
    };
    useEffect(() => {
        fechDogBreeds();
    }, []);
    
    return (
        <section>
            <div className="w-full p-4 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center text-white">Lista de razas de perros</h1>
                <ul className="list-disc list-inside gap-2 w-full h-[400px] overflow-y-scroll rounded-lg border border-gray-200 p-4 bg-gray-700">
                    {dogBreeds && Object.keys(dogBreeds).map((breed) => (
                        <li 
                        key={breed}
                        className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-300">{breed}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
