
import { PetExplorer } from "../types/petExplorer";

const CAT_API = "https://api.thecatapi.com/v1";
const DOG_API = "https://api.thedogapi.com/v1";

const CAT_API_KEY = "live_KKaZyPk6ykFJDGG9SzHHadp1M0X5TzRMEAoemhyJnSp0TxFczrxRhMb1kRATpwI7";
const DOG_API_KEY = "live_4RhP4IS0jdtQK0do6pCd03lX7rklTFX5BnrrRu4OguFxgFAyjbg72xbp3SrGJARj";

interface ApiBreed {
  id: string;
  name: string;
  origin?: string;
  description?: string;
  temperament?: string;
}

interface ApiImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: ApiBreed[];
  breed_ids?: string;
}

const getBreedDetails = async (
  species: "cat" | "dog",
  breedId: string
): Promise<ApiBreed | null> => {
  const baseUrl = species === "cat" ? CAT_API : DOG_API;
  const apiKey = species === "cat" ? CAT_API_KEY : DOG_API_KEY;

  const response = await fetch(`${baseUrl}/breeds/${breedId}`, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

const getPetImages = async (
  species: "cat" | "dog"
): Promise<PetExplorer[]> => {
  const baseUrl = species === "cat" ? CAT_API : DOG_API;
  const apiKey = species === "cat" ? CAT_API_KEY : DOG_API_KEY;

  const response = await fetch(
    `${baseUrl}/images/search?limit=10&has_breeds=1&include_breeds=1`,
    {
      headers: {
        "x-api-key": apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil data ${species === "cat" ? "kucing" : "anjing"}`
    );
  }

  const images: ApiImage[] = await response.json();

  const pets = await Promise.all(
    images.map(async (item) => {
      let breed = item.breeds?.[0];

      if (!breed && item.breed_ids) {
        breed = (await getBreedDetails(species, item.breed_ids)) ?? undefined;
      }

      return {
        id: item.id,
        url: item.url,
        width: item.width,
        height: item.height,
        species,
        breed: breed?.name || "Unknown Breed",
        origin: breed?.origin || "Unknown",
        description: breed?.description || "No description available.",
        temperament: breed?.temperament || "Unknown",
      };
    })
  );

  return pets;
};

export const getCats = (): Promise<PetExplorer[]> => {
  return getPetImages("cat");
};

export const getDogs = (): Promise<PetExplorer[]> => {
  return getPetImages("dog");
};
