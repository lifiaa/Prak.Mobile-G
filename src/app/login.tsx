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
import { supabase } from "../lib/supabase";
import { showMessage } from "../lib/notification";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  const cleanEmail = email.trim();

  if (!cleanEmail || !password) {
    showMessage("Login Gagal", "Email dan password wajib diisi.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    showMessage("Email Tidak Valid", "Masukkan alamat email yang benar.");
    return;
  }

  try {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      showMessage("Login Gagal", "Email atau password salah.");
      return;
    }

    if (!data.session) {
      showMessage("Login Gagal", "Session tidak berhasil dibuat.");
      return;
    }

    router.replace("/");
  } catch {
    showMessage(
      "Terjadi Kesalahan",
      "Tidak dapat menghubungi server. Periksa koneksi internet."
    );
  } finally {
    setLoading(false);
  }
};

const handleForgotPassword = async () => {
  const cleanEmail = email.trim();

  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    showMessage("Email Tidak Valid", "Masukkan email yang benar terlebih dahulu.");
    return;
  }

  try {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);

    if (error) {
      showMessage("Gagal", error.message);
      return;
    }

    showMessage(
      "Email Terkirim",
      "Silakan periksa email untuk mengatur ulang password."
    );
  } catch {
    showMessage("Terjadi Kesalahan", "Tidak dapat menghubungi server.");
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="paw" size={34} color="#FFFFFF" />
              </View>
              <Text style={styles.logoText}>PETCARE+</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>login to your account</Text>

            <View style={styles.form}>
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

              <TouchableOpacity
                style={styles.forgotButton}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

                <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
                >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                )}
                </TouchableOpacity>
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.signupLink}>Signup</Text>
              </TouchableOpacity>
            </View>
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
    height: 310,
    backgroundColor: "#151C32",
    borderBottomLeftRadius: 105,
    borderBottomRightRadius: 105,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -8,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#30384F",
    borderWidth: 1,
    borderColor: "#515A70",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  title: {
    color: "#151C32",
    fontSize: 25,
    fontWeight: "800",
  },
  subtitle: {
    color: "#91A1BA",
    fontSize: 13,
    marginTop: 4,
  },
  form: {
    marginTop: 55,
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
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 7,
    marginBottom: 27,
  },
  forgotText: {
    color: "#26334D",
    fontSize: 11,
    fontWeight: "500",
  },
  loginButton: {
    height: 49,
    backgroundColor: "#151C32",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#151C32",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
  },
  signupText: {
    color: "#91A1BA",
    fontSize: 11,
  },
  signupLink: {
    color: "#151C32",
    fontSize: 11,
    fontWeight: "700",
  },
});
