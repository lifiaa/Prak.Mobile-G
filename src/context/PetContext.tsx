
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { pets as initialPets } from "../data/pets";
import type { Pet } from "../types/pet";

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Pet) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export function PetProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(initialPets);

  const addPet = (pet: Pet) => {
    setPets((currentPets) => [...currentPets, pet]);
  };

  return (
    <PetContext.Provider value={{ pets, addPet }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("usePets harus digunakan di dalam PetProvider");
  }

  return context;
}