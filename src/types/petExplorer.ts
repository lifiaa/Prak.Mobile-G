export interface PetExplorer {
  id: string;
  url: string;
  width: number;
  height: number;
  species: "cat" | "dog";
  breed: string;
  origin: string;
  description: string;
  temperament: string;
}