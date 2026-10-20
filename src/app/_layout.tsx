
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="pets/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="pets/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="add-pet"
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
