import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../styles";

export default function AddPet() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

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
      Alert.alert(
        "Validasi",
        "Nama hewan hanya boleh berisi huruf dan spasi."
      );
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
    <SafeAreaView
      edges={["top"]}
      style={[
        localStyles.safeArea,
        { backgroundColor: theme.background },
      ]}
    >
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* HEADER FIXED */}
      <View
        style={[
          localStyles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Pressable
          onPress={handleBack}
          hitSlop={8}
          style={({ pressed }) => [
            localStyles.headerButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={theme.text}
          />
        </Pressable>

        <View style={localStyles.headerTitleContainer}>
          <Text
            style={[
              localStyles.headerTitle,
              { color: theme.text },
            ]}
          >
            PetCare+
          </Text>
          <Text
            style={[
              localStyles.headerSubtitle,
              { color: theme.subtitle },
            ]}
          >
            TAMBAH HEWAN
          </Text>
        </View>

        <View style={localStyles.headerButtonPlaceholder} />
      </View>

      {/* FORM YANG BISA DI-SCROLL */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={localStyles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* JUDUL FORM */}
        <View style={localStyles.heading}>
          <View
            style={[
              localStyles.headingIcon,
              {
                backgroundColor: darkMode ? "#26382C" : "#E7F5E8",
              },
            ]}
          >
            <Ionicons
              name="paw"
              size={34}
              color={darkMode ? "#A8E0BC" : "#287A5B"}
            />
          </View>

          <Text
            style={[
              localStyles.title,
              { color: theme.text },
            ]}
          >
            Tambah Hewan
          </Text>

          <Text
            style={[
              localStyles.subtitle,
              { color: theme.subtitle },
            ]}
          >
            Kenalkan teman berbulu baru kamu. Lengkapi informasi
            hewan peliharaanmu di bawah ini.
          </Text>
        </View>

        {/* FORM INPUT */}
        <View
          style={[
            localStyles.form,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {/* NAMA HEWAN */}
          <View style={localStyles.field}>
            <Text
              style={[
                localStyles.label,
                { color: theme.text },
              ]}
            >
              Nama Hewan
            </Text>

            <CustomInput
              style={[
                localStyles.input,
                {
                  backgroundColor: theme.field,
                  color: theme.fieldText,
                  borderColor: theme.border,
                },
              ]}
              placeholder="Masukkan nama hewan"
              placeholderTextColor={theme.placeholder}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* JENIS HEWAN */}
          <View style={localStyles.field}>
            <Text
              style={[
                localStyles.label,
                { color: theme.text },
              ]}
            >
              Jenis Hewan
            </Text>

            <CustomInput
              style={[
                localStyles.input,
                {
                  backgroundColor: theme.field,
                  color: theme.fieldText,
                  borderColor: theme.border,
                },
              ]}
              placeholder="Contoh: Kucing, Anjing"
              placeholderTextColor={theme.placeholder}
              value={type}
              onChangeText={setType}
            />
          </View>

          {/* RAS HEWAN */}
          <View style={localStyles.field}>
            <Text
              style={[
                localStyles.label,
                { color: theme.text },
              ]}
            >
              Ras
            </Text>

            <CustomInput
              style={[
                localStyles.input,
                {
                  backgroundColor: theme.field,
                  color: theme.fieldText,
                  borderColor: theme.border,
                },
              ]}
              placeholder="Masukkan ras hewan"
              placeholderTextColor={theme.placeholder}
              value={breed}
              onChangeText={setBreed}
            />
          </View>

          {/* UMUR HEWAN */}
          <View style={localStyles.field}>
            <Text
              style={[
                localStyles.label,
                { color: theme.text },
              ]}
            >
              Umur (tahun)
            </Text>

            <CustomInput
              style={[
                localStyles.input,
                {
                  backgroundColor: theme.field,
                  color: theme.fieldText,
                  borderColor: theme.border,
                },
              ]}
              placeholder="Masukkan umur"
              placeholderTextColor={theme.placeholder}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>

          {/* TOMBOL SIMPAN */}
          <CustomButton
            title="Tambah Hewan"
            onPress={handleSubmit}
            style={{ marginTop: 8 }}
          />
        </View>

        {/* FOOTER */}
        <View style={localStyles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={16}
            color={theme.secondary}
          />
          <Text
            style={[
              localStyles.footerText,
              { color: theme.subtitle },
            ]}
          >
            Pastikan informasi yang kamu masukkan sudah benar.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  headerSubtitle: {
    fontSize: 10,
    letterSpacing: 1.5,
    marginTop: 3,
  },
  headerButtonPlaceholder: {
    width: 44,
    height: 44,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  heading: {
    alignItems: "center",
    marginBottom: 24,
  },
  headingIcon: {
    width: 68,
    height: 68,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: -0.6,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  form: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
  },
  input: {
    minHeight: 50,
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 15,
    borderWidth: 1,
  },
  field: {
    marginBottom: 17,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 9,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 20,
    paddingHorizontal: 8,
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
  },
});
