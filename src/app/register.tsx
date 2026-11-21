import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../lib/supabase";
import { showMessage } from "../lib/notification";

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

const handleRegister = async () => {
  const cleanName = fullName.trim();
  const cleanEmail = email.trim();

  if (!cleanName || !cleanEmail || !password || !confirmPassword) {
    showMessage("Perhatian", "Semua kolom wajib diisi.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    showMessage("Email Tidak Valid", "Masukkan alamat email yang benar.");
    return;
  }

  if (password.length < 6) {
    showMessage("Password Tidak Valid", "Password minimal 6 karakter.");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Password Tidak Cocok", "Konfirmasi password tidak sama.");
    return;
  }

  try {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanName,
        },
      },
    });

    if (error) {
      showMessage("Registrasi Gagal", error.message);
      return;
    }

    if (data.session) {
      showMessage(
        "Registrasi Berhasil",
        "Akun PetCare+ berhasil dibuat.",
        () => router.replace("/")
      );
    } else {
      showMessage(
        "Registrasi Berhasil",
        "Silakan login menggunakan akun yang sudah dibuat.",
        () => router.replace("/login")
      );
    }
  } catch {
    showMessage(
      "Terjadi Kesalahan",
      "Tidak dapat menghubungi server. Periksa koneksi internet."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View style={styles.pawCircle}>
              <Ionicons name="paw" size={25} color="#FFFFFF" />
            </View>

            <View style={styles.decoration}>
              <Ionicons name="paw" size={76} color="#E5E7EB" />
            </View>

            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Create your new account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={19} color="#91A1BA" />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#91A1BA"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={19} color="#91A1BA" />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#91A1BA"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={19} color="#91A1BA" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#91A1BA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={19}
                  color="#91A1BA"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={19} color="#91A1BA" />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#91A1BA"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={19}
                  color="#91A1BA"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
                handleRegister();
            }}
            disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.registerButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 25,
  },
  header: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 20,
  },
  pawCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#151C32",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  decoration: {
    position: "absolute",
    right: 25,
    top: 45,
    opacity: 0.9,
  },
  title: {
    color: "#151C32",
    fontSize: 27,
    fontWeight: "800",
    marginTop: 0,
  },
  subtitle: {
    color: "#91A1BA",
    fontSize: 13,
    marginTop: 5,
  },
  form: {
    paddingHorizontal: 25,
    marginTop: 45,
  },
  inputContainer: {
    height: 47,
    backgroundColor: "#F0F3F7",
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    color: "#151C32",
    fontSize: 13,
    marginLeft: 12,
    paddingVertical: 0,
  },
  registerButton: {
    height: 49,
    backgroundColor: "#151C32",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
    shadowColor: "#151C32",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 75,
  },
  loginText: {
    color: "#91A1BA",
    fontSize: 11,
  },
  loginLink: {
    color: "#151C32",
    fontSize: 11,
    fontWeight: "700",
  },
});
