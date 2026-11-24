import { Stack, Redirect, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { ThemeProvider } from "../context/ThemeContext";
import { PetProvider } from "../context/PetContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

// Mengatur navigasi berdasarkan status autentikasi pengguna
function RootNavigator() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();

  // Memeriksa apakah pengguna sedang berada di halaman Login atau Register
  const isAuthScreen =
    segments[0] === "login" || segments[0] === "register";

  // Menampilkan loading selama pemeriksaan session berlangsung
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ActivityIndicator size="large" color="#151C32" />
      </View>
    );
  }

  // Jika belum login, arahkan pengguna ke halaman Login
  if (!session && !isAuthScreen) {
    return <Redirect href="/login" />;
  }

  // Jika sudah login, cegah pengguna kembali ke Login atau Register
  if (session && isAuthScreen) {
    return <Redirect href="/" />;
  }

  // Mengatur halaman dan konfigurasi navigasi aplikasi
  return (
    <Stack>
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="pets/index" options={{ headerShown: false }} />
      <Stack.Screen name="pets/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="add-pet" options={{ headerShown: false }} />
      <Stack.Screen name="edit-pet" options={{ headerShown: false }} />
      <Stack.Screen name="petCareAI" options={{ headerShown: false }} />
      <Stack.Screen name="pet-explorer" options={{ headerShown: false }} />
      <Stack.Screen name="pet-explorer/cats" options={{ headerShown: false }} />
      <Stack.Screen name="pet-explorer/dogs" options={{ headerShown: false }} />
    </Stack>
  );
}

// Membungkus aplikasi dengan provider agar context dapat digunakan
export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PetProvider>
          <RootNavigator />
        </PetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}