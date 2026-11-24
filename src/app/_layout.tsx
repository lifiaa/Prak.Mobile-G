import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { ThemeProvider } from "../context/ThemeContext";
import { PetProvider } from "../context/PetContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootNavigator() {
  const { session, isLoading } = useAuth();

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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>

      <Stack.Protected guard={!!session}>
        <Stack.Screen name="index" />
        <Stack.Screen name="notification" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="pets/index" />
        <Stack.Screen name="pets/[id]" />
        <Stack.Screen name="add-pet" />
        <Stack.Screen name="edit-pet" />
        <Stack.Screen name="petCareAI" />
        <Stack.Screen name="pet-explorer" />
        <Stack.Screen name="pet-explorer/cats" />
        <Stack.Screen name="pet-explorer/dogs" />
        <Stack.Screen name="telephony" />
        <Stack.Screen name="location" />
        <Stack.Screen name="lifecycle" />
      </Stack.Protected>
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
