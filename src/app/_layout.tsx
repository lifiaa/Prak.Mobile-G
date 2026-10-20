import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { PetProvider } from "../context/PetContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <PetProvider>
      <Stack>
        <Stack.Screen
          name="index"
          // options={{ title: "Home" }}
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pets/index"
          // options={{ title: "Daftar Hewan" }}
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pets/[id]"
          // options={{ title: "Detail Hewan" }}
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="add-pet"
          // options={{ title: "Tambah Hewan" }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="petCareAI"
          options={{ headerShown: false }}
        />
      </Stack>
      </PetProvider>
    </ThemeProvider>
  );
}
