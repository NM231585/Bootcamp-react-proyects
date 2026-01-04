import RandomDog from "../components/RandomDog";
import { DogBreeds } from "../components/fetchDog";
import {SelectBreeds} from "../components/SelectBreeds";

export function Welcome() {
    return (
      <>
        <div>
            <h1 className="text-3xl font-bold text-center mt-10 mb-10 text-white">Página para consumir la API de perros</h1>
        </div>

        <RandomDog />
        <DogBreeds />
        <SelectBreeds />
      </>
    );
}
