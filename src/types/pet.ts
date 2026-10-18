import { ImageSourcePropType } from "react-native";

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  ageCategories: string;
  image: ImageSourcePropType;
  description: string;
}