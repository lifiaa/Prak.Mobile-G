
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { themeColors } from "../../styles";
import { PetExplorer } from "../../types/petExplorer";
import { getCats } from "../../services/petExplorerService";

export default function CatsScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;
  const { width } = useWindowDimensions();

  const numColumns = width >= 1100 ? 3 : width >= 650 ? 2 : 1;

  const [cats, setCats] = useState<PetExplorer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCats = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCats();
        setCats(data);
      } catch {
        setError("Gagal mengambil data kucing. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    loadCats();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      height: 64,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      position: "relative",
    },
    backButton: {
      position: "absolute",
      left: 20,
      width: 42,
      height: 42,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.card,
    },
    headerTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.text,
    },
    headerSubtitle: {
      fontSize: 9,
      letterSpacing: 1.5,
      color: theme.subtitle,
      marginTop: 3,
    },
    intro: {
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 10,
    },
    eyebrow: {
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1.5,
      color: theme.accent,
      marginBottom: 12,
    },
    title: {
      fontSize: 25,
      fontWeight: "900",
      color: theme.text,
    },
    subtitle: {
      fontSize: 12,
      color: theme.subtitle,
      marginTop: 7,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 30,
      flexGrow: 1,
    },
    columnWrapper: {
      gap: 16,
      alignItems: "stretch",
    },
    card: {
      flex: 1,
      minWidth: 0,
      marginBottom: 16,
      padding: 12,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      aspectRatio: 16 / 9,
      borderRadius: 12,
      backgroundColor: theme.background,
    },
    cardContent: {
      paddingTop: 12,
      gap: 8,
    },
    breed: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
    },
    origin: {
      fontSize: 12,
      color: theme.subtitle,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.text,
      marginTop: 5,
    },
    description: {
      fontSize: 12,
      lineHeight: 19,
      color: theme.subtitle,
    },
    temperamentBox: {
      backgroundColor: theme.background,
      borderRadius: 10,
      padding: 11,
      marginTop: 4,
    },
    temperamentTitle: {
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 0.5,
      color: theme.accent,
    },
    temperament: {
      fontSize: 11,
      lineHeight: 17,
      color: theme.text,
      marginTop: 5,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 30,
    },
    statusText: {
      color: theme.subtitle,
      fontSize: 13,
      textAlign: "center",
      marginTop: 12,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.headerTitle}>PetCare+</Text>
          <Text style={styles.headerSubtitle}>KOLEKSI HEWAN</Text>
        </View>
      </View>

      <View style={styles.intro}>
        <Text style={styles.eyebrow}>PET EXPLORER / CAT COLLECTION</Text>
        <Text style={styles.title}>Cat Explorer 🐱</Text>
        <Text style={styles.subtitle}>
          Kenali berbagai ras kucing, karakteristik, dan asalnya.
        </Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.accent} />
          <Text style={styles.statusText}>Memuat koleksi kucing...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={42} color={theme.accent} />
          <Text style={styles.statusText}>{error}</Text>
          <TouchableOpacity
            onPress={() => router.replace("/pet-explorer/cats")}
          >
            <Text style={{ color: theme.accent, marginTop: 15, fontWeight: "700" }}>
              Coba lagi
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          key={numColumns}
          data={cats}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={
            numColumns > 1 ? styles.columnWrapper : undefined
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.url }}
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.cardContent}>
                <Text style={styles.breed}>{item.breed}</Text>
                <Text style={styles.origin}>📍 {item.origin}</Text>

                <Text style={styles.sectionTitle}>About this breed</Text>
                <Text style={styles.description}>
                  {item.description}
                </Text>

                <View style={styles.temperamentBox}>
                  <Text style={styles.temperamentTitle}>TEMPERAMENT</Text>
                  <Text style={styles.temperament}>
                    {item.temperament}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
