import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { pets as initialPets } from "../data/pets";
import type { Pet } from "../types/pet";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Pet) => Promise<void>;
  updatePet: (id: string, pet: Partial<Pet>) => Promise<void>;
  deletePet: (id: string) => Promise<void>;
  isLoading: boolean;
}

const defaultPets: Pet[] = initialPets.map((pet) => ({
  ...pet,
  isDefault: true,
}));

const PetContext = createContext<PetContextType | undefined>(undefined);

export function PetProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>(defaultPets);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadPets = async () => {
      setIsLoading(true);

      if (!user) {
        setPets(defaultPets);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("pets")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        const userPets: Pet[] = (data ?? []).map((pet) => ({
          id: pet.id,
          user_id: pet.user_id,
          name: pet.name,
          type: pet.type,
          breed: pet.breed ?? "",
          age: pet.age ?? 0,
          ageCategories: pet.age_categories ?? "",
          image: pet.image_url
            ? { uri: pet.image_url }
            : require("../../assets/cats/aya.jpeg"),
          image_url: pet.image_url,
          description: pet.description ?? "",
          isDefault: false,
        }));

        if (mounted) {
          setPets([...defaultPets, ...userPets]);
        }
      } catch (error) {
        console.error("Gagal memuat data hewan:", error);
        if (mounted) {
          setPets(defaultPets);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadPets();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  const addPet = async (pet: Pet) => {
    if (!user) {
      throw new Error("Pengguna belum login.");
    }

    const { data, error } = await supabase
      .from("pets")
      .insert({
        user_id: user.id,
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        age_categories: pet.ageCategories,
        image_url: pet.image_url ?? null,
        description: pet.description,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    const newPet: Pet = {
      id: data.id,
      user_id: data.user_id,
      name: data.name,
      type: data.type,
      breed: data.breed ?? "",
      age: data.age ?? 0,
      ageCategories: data.age_categories ?? "",
      image: data.image_url
        ? { uri: data.image_url }
        : require("../../assets/cats/aya.jpeg"),
      image_url: data.image_url,
      description: data.description ?? "",
      isDefault: false,
    };

    setPets((currentPets) => [...currentPets, newPet]);
  };

  const updatePet = async (id: string, pet: Partial<Pet>) => {
  if (!user) {
    throw new Error("Pengguna belum login.");
  }

  const { error } = await supabase
    .from("pets")
    .update({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      age_categories: pet.ageCategories,
      image_url: pet.image_url ?? null,
      description: pet.description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

    if (error) throw error;

    setPets((currentPets) =>
      currentPets.map((item) =>
        item.id === id ? { ...item, ...pet } : item
      )
    );
  };

  const deletePet = async (id: string) => {
    if (!user) {
      throw new Error("Pengguna belum login.");
    }

    const { error } = await supabase
      .from("pets")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;

    setPets((currentPets) =>
      currentPets.filter((item) => item.id !== id)
    );
  };

  return (
    <PetContext.Provider value={{ pets, addPet, updatePet, deletePet, isLoading }}>
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