import { PetExplorer } from "../types/petExplorer";

// CALL API
const CAT_API = "https://api.thecatapi.com/v1";
const DOG_API = "https://api.thedogapi.com/v1";

// KEY API PUBLIC
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
  // fetch() mengirim permintaan ke API.
  const response = await fetch(`${baseUrl}/breeds/${breedId}`, {
    headers: {
      "x-api-key": apiKey,
    },
  });
  // response.ok memeriksa apakah HTTP request berhasil
  if (!response.ok) {
    return null;
  }

  return response.json(); //response.json() membaca response menjadi data JavaScript.
};

const checkResponse = (
  response: Response,
  species: "cat" | "dog"
): Promise<Response> => {
  if (!response.ok) {
    // reject() buat mengbalikan yg gagal
    return Promise.reject(
      new Error(
        `Gagal mengambil data ${species === "cat" ? "kucing" : "anjing"}`
      )
    );
  }
  // Promise.resolve() menghasilkan Promise berhasil, Digunakan untuk membuat Promise yang langsung berada dalam kondisi fulfilled.
  return Promise.resolve(response);
};

const getPetImages = (
  species: "cat" | "dog"
): Promise<PetExplorer[]> => {
  const baseUrl = species === "cat" ? CAT_API : DOG_API;
  const apiKey = species === "cat" ? CAT_API_KEY : DOG_API_KEY;

  return fetch(
    `${baseUrl}/images/search?limit=10&has_breeds=1&include_breeds=1`,
    {
      headers: {
        "x-api-key": apiKey,
      },
    }
  )
    // .then() digunakan untuk menjalankan kode ketika Promise berhasil diselesaikan.
    // .then() sendiri juga menghasilkan sebuah Promise baru, dan nilai dari Promise tersebut berasal dari apa pun yang dikembalikan (returned) oleh callback.
    .then((response) => checkResponse(response, species))
    .then((response) => response.json())
    .then((images: ApiImage[]) => {
      return Promise.all(
        images.map(async (item) => {
          let breed = item.breeds?.[0];

          if (!breed && item.breed_ids) {
            breed =
              (await getBreedDetails(species, item.breed_ids)) ?? undefined;
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
    });
};

export const getCats = (): Promise<PetExplorer[]> => {
  return getPetImages("cat");
};

export const getDogs = (): Promise<PetExplorer[]> => {
  return getPetImages("dog");
};
