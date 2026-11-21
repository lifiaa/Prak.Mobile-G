import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../styles";
import { getCurrentLocation } from "../services/locationService";

export default function LocationScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetLocation = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getCurrentLocation();
      setLocation(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal mengambil lokasi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color={theme.text} />
        </TouchableOpacity>

        <Text style={{
          color: theme.text,
          fontSize: 25,
          fontWeight: "800",
          marginTop: 25,
        }}>
          Pet Location 📍
        </Text>

        <Text style={{
          color: theme.subtitle,
          marginTop: 8,
          lineHeight: 22,
        }}>
          Temukan koordinat lokasi perangkat untuk mendukung layanan berbasis lokasi.
        </Text>

        <TouchableOpacity
          onPress={handleGetLocation}
          disabled={loading}
          style={{
            backgroundColor: theme.accent,
            padding: 16,
            borderRadius: 14,
            alignItems: "center",
            marginTop: 25,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
              Ambil Lokasi Saya
            </Text>
          )}
        </TouchableOpacity>

        {error !== "" && (
          <Text style={{ color: "red", marginTop: 20 }}>
            {error}
          </Text>
        )}

        {location && (
          <View style={{
            backgroundColor: theme.card,
            borderRadius: 15,
            padding: 18,
            marginTop: 25,
          }}>
            <Text style={{ color: theme.text, fontWeight: "800", fontSize: 17 }}>
              Lokasi Berhasil Ditemukan
            </Text>

            <Text style={{ color: theme.subtitle, marginTop: 15 }}>
              Latitude: {location.latitude}
            </Text>

            <Text style={{ color: theme.subtitle, marginTop: 10 }}>
              Longitude: {location.longitude}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}