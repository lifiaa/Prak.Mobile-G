import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
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
      </Stack>
    </ThemeProvider>
  );
}
