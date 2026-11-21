import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePets } from "../context/PetContext";
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../styles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { showMessage } from "../lib/notification";

export default function EditPet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { pets, updatePet } = usePets();
  const { darkMode } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  const pet = pets.find((item) => item.id === String(id));

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setType(pet.type);
      setBreed(pet.breed);
      setAge(String(pet.age));
    }
  }, [pet?.id]);

  const handleSubmit = async () => {
    if (!pet || isSaving) return;

    const cleanName = name.trim();
    const cleanType = type.trim();
    const cleanBreed = breed.trim();
    const cleanAge = age.trim();

    if (!cleanName || cleanName.length < 2 || cleanName.length > 30) {
      showMessage("Validasi", "Nama hewan harus terdiri dari 2–30 karakter.");
      return;
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(cleanName)) {
      showMessage("Validasi", "Nama hanya boleh berisi huruf dan spasi.");
      return;
    }

    if (cleanType.length < 3 || cleanBreed.length < 2) {
      showMessage("Validasi", "Jenis dan ras hewan wajib diisi dengan benar.");
      return;
    }

    if (!/^\d+$/.test(cleanAge) || Number(cleanAge) > 100) {
      showMessage("Validasi", "Umur harus berupa angka antara 0–100.");
      return;
    }

    const ageNumber = Number(cleanAge);
    const ageCategories =
      ageNumber <= 1 ? "Child" : ageNumber < 7 ? "Adult" : "Senior";

    try {
      setIsSaving(true);

      await updatePet(pet.id, {
        name: cleanName,
        type: cleanType,
        breed: cleanBreed,
        age: ageNumber,
        ageCategories,
        description: `${cleanName} adalah ${cleanType.toLowerCase()} yang menjadi bagian dari keluarga PetCare+.`,
      });

      showMessage("Berhasil", "Data hewan berhasil diperbarui!");
      router.replace(`/pets/${pet.id}`);
    } catch (error) {
      console.error("Gagal memperbarui hewan:", error);
      showMessage("Gagal", "Data hewan tidak berhasil diperbarui.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!pet) {
    return (
      <View style={localStyles.center}>
        <Text>Hewan tidak ditemukan.</Text>
      </View>
    );
  }

  if (pet.isDefault) {
    return (
      <View style={localStyles.center}>
        <Text>Data hewan bawaan tidak dapat diedit.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      edges={["top"]}
      style={[localStyles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <ScrollView contentContainerStyle={localStyles.content}>
        <Text style={[localStyles.title, { color: theme.text }]}>
          Edit Hewan
        </Text>

        <Text style={[localStyles.subtitle, { color: theme.subtitle }]}>
          Perbarui informasi hewan peliharaanmu.
        </Text>

        <View style={[localStyles.form, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[localStyles.label, { color: theme.text }]}>Nama Hewan</Text>
          <CustomInput value={name} onChangeText={setName} placeholder="Nama hewan" />

          <Text style={[localStyles.label, { color: theme.text }]}>Jenis Hewan</Text>
          <CustomInput value={type} onChangeText={setType} placeholder="Jenis hewan" />

          <Text style={[localStyles.label, { color: theme.text }]}>Ras</Text>
          <CustomInput value={breed} onChangeText={setBreed} placeholder="Ras hewan" />

          <Text style={[localStyles.label, { color: theme.text }]}>Umur (tahun)</Text>
          <CustomInput
            value={age}
            onChangeText={setAge}
            placeholder="Umur hewan"
            keyboardType="numeric"
          />

          <CustomButton
            title={isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            onPress={handleSubmit}
            style={{ marginTop: 15 }}
          />

          <CustomButton
            title="Batal"
            onPress={() => router.back()}
            style={{ marginTop: 10 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 24,
  },
  form: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 9,
    marginTop: 15,
  },
});