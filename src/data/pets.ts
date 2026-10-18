import { Pet } from "../types/pet";

export const pets: Pet[] = [
  {
    id: "aya",
    name: "Aya",
    type: "Cat",
    breed: "Himalayan",
    age: 2,
    ageCategories: "Adult",
    image: require("../../assets/cats/aya.jpeg"),
    description: "Aya adalah kucing Himalayan yang manis dan suka bermain.",
  },
  {
    id: "loopy",
    name: "Loopy",
    type: "Cat",
    breed: "Domestic",
    age: 1,
    image: require("../../assets/cats/loopy.jpeg"),
    ageCategories: "Child",
    description: "Loopy adalah kucing domestic yang aktif dan penuh rasa ingin tahu.",
  },
  {
    id: "3",
    name: "Milo",
    type: "Cat",
    breed: "Persia",
    age: 4,
    ageCategories: "Adult",
    image: require("../../assets/cats/milo.jpeg"),
    description: "Milo adalah kucing Persia yang aktif dan penuh rasa ingin tahu.",
}
];