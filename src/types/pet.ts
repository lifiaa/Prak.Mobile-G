import { ImageSourcePropType } from "react-native";

export interface Pet {
  id: string;
  user_id?: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  ageCategories: string;
  image: ImageSourcePropType | { uri: string };
  image_url?: string | null;
  description: string;
  isDefault?: boolean;
}