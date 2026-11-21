import { Stack, Redirect, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { ThemeProvider } from "../context/ThemeContext";
import { PetProvider } from "../context/PetContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootNavigator() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();

  const isAuthScreen =
    segments[0] === "login" || segments[0] === "register";

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

  if (!session && !isAuthScreen) {
    return <Redirect href="/login" />;
  }

  if (session && isAuthScreen) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="register"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
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
        name="edit-pet"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="petCareAI"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pet-explorer"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pet-explorer/cats"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pet-explorer/dogs"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

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