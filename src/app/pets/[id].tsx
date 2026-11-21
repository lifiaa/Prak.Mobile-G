import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePets } from "../../context/PetContext";
import { styles, themeColors } from "../../styles";
import { useTheme } from "../../context/ThemeContext";
import { showMessage } from "../../lib/notification";

export default function PetDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { darkMode } = useTheme();
  const { pets, deletePet } = usePets();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  const pet = pets.find((item) => item.id === String(id));

  const handleDelete = async () => {
    if (!pet || pet.isDefault) return;

    const confirmDelete = async () => {
      try {
        await deletePet(pet.id);
        showMessage("Berhasil", "Data hewan berhasil dihapus!");
        router.replace("/pets");
      } catch (error) {
        console.error("Gagal menghapus hewan:", error);
        showMessage("Gagal", "Data hewan tidak berhasil dihapus.");
      }
    };

    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        `Apakah kamu yakin ingin menghapus ${pet.name}?`
      );

      if (confirmed) {
        await confirmDelete();
      }
    } else {
      Alert.alert(
        "Hapus Hewan",
        `Apakah kamu yakin ingin menghapus ${pet.name}?`,
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Hapus",
            style: "destructive",
            onPress: confirmDelete,
          },
        ]
      );
    }
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.petListTitle}>Hewan tidak ditemukan</Text>
        <Pressable onPress={() => router.replace("/pets")}>
          <Text style={styles.seeAll}>‹ Kembali</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/pets");
          }
        }}
        style={{ alignSelf: "flex-start", marginBottom: 22 }}
      >
        <Text
          style={{
            color: darkMode ? "#A8E0BC" : "#287A5B",
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          ‹ Kembali
        </Text>
      </Pressable>

      <View style={styles.petDetailImageContainer}>
        <Image
          source={pet.image}
          style={styles.petDetailImage}
        />
      </View>

      <Text style={[styles.petDetailName, { color: theme.text }]}>
        {pet.name}
      </Text>

      <Text style={[styles.petDetailBreed, { color: theme.subtitle }]}>
        {pet.breed}
      </Text>

      <View
        style={[
          styles.petDetailInfo,
          { backgroundColor: theme.card },
        ]}
      >
        <Text style={[styles.petDetailLabel, { color: theme.subtitle }]}>
          Jenis
        </Text>
        <Text style={[styles.petDetailValue, { color: theme.subtitle }]}>
          {pet.type}
        </Text>

        <Text style={[styles.petDetailLabel, { color: theme.subtitle }]}>
          Umur
        </Text>
        <Text style={[styles.petDetailValue, { color: theme.subtitle }]}>
          {pet.age} tahun
        </Text>

        <Text style={[styles.petDetailLabel, { color: theme.subtitle }]}>
          Kategori Usia
        </Text>
        <Text style={[styles.petDetailValue, { color: theme.subtitle }]}>
          {pet.ageCategories}
        </Text>
      </View>

      <Text
        style={[
          styles.petDetailDescription,
          {
            backgroundColor: theme.card,
            color: theme.subtitle,
          },
        ]}
      >
        {pet.description}
      </Text>

      {!pet.isDefault && (
        <View style={{ gap: 12, marginTop: 20 }}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/edit-pet",
                params: { id: pet.id },
              })
            }
            style={{
              backgroundColor: theme.button,
              padding: 16,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme.buttonText, fontWeight: "800" }}>
              Edit Hewan
            </Text>
          </Pressable>

          <Pressable
            onPress={handleDelete}
            style={{
              backgroundColor: "#D9534F",
              padding: 16,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>
              Hapus Hewan
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}