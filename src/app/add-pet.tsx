import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default function AddPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = () => {
    const cleanName = name.trim();
    const cleanType = type.trim();
    const cleanBreed = breed.trim();
    const cleanAge = age.trim();

    if (!cleanName) {
        Alert.alert("Validasi", "Nama hewan wajib diisi.");
        return;
    }

    if (cleanName.length < 2) {
        Alert.alert("Validasi", "Nama hewan minimal 2 karakter.");
        return;
    }

    if (cleanName.length > 30) {
        Alert.alert("Validasi", "Nama hewan maksimal 30 karakter.");
        return;
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(cleanName)) {
        Alert.alert("Validasi", "Nama hewan hanya boleh berisi huruf dan spasi.");
        return;
    }

    if (!cleanType) {
        Alert.alert("Validasi", "Jenis hewan wajib diisi.");
        return;
    }

    if (cleanType.length < 3) {
        Alert.alert("Validasi", "Jenis hewan minimal 3 karakter.");
        return;
    }

    if (!cleanBreed) {
        Alert.alert("Validasi", "Ras wajib diisi.");
        return;
    }

    if (cleanBreed.length < 2) {
        Alert.alert("Validasi", "Ras minimal 2 karakter.");
        return;
    }

    if (!cleanAge) {
        Alert.alert("Validasi", "Umur wajib diisi.");
        return;
    }

    if (!/^\d+$/.test(cleanAge)) {
        Alert.alert("Validasi", "Umur harus berupa angka.");
        return;
    }

    const ageNumber = Number(cleanAge);

    if (ageNumber < 0) {
        Alert.alert("Validasi", "Umur tidak boleh kurang dari 0.");
        return;
    }

    if (ageNumber > 100) {
        Alert.alert("Validasi", "Umur tidak boleh lebih dari 100 tahun.");
        return;
    }

    Alert.alert(
        "Berhasil",
        `${cleanName} berhasil ditambahkan sebagai ${cleanType}.`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { letterSpacing: 0.5 }]}>Tambah Hewan</Text>

      <Text style={styles.subtitle}>Tambahkan data hewan peliharaanmu.</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Nama Hewan</Text>
          <CustomInput
            placeholder="Masukkan nama hewan"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Jenis Hewan</Text>
          <CustomInput
            placeholder="Contoh: Kucing, Anjing"
            value={type}
            onChangeText={setType}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Ras</Text>
          <CustomInput
            placeholder="Masukkan ras hewan"
            value={breed}
            onChangeText={setBreed}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Umur</Text>
          <CustomInput
            placeholder="Masukkan umur"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>

        <CustomButton
          title="Tambah Hewan"
          onPress={handleSubmit}
          style={{ marginTop: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FA",
    paddingHorizontal: 20,
    paddingTop: 45,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#13293D",
    marginTop: 20,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7C8F",
    lineHeight: 25,
    marginBottom: 28,
  },

  form: {
    gap: 4,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#13293D",
    marginBottom: 8,
  },
});
