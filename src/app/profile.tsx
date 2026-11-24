import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { showMessage } from "../lib/notification";

export default function Profile() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const fullName =
    user?.user_metadata?.full_name || "PetCare User";

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      router.replace("/login");
    } catch {
      showMessage("Logout Gagal", "Tidak dapat keluar dari akun.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color="#FFFFFF" />
        </View>

        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={21} color="#91A1BA" />
            <View style={styles.infoContent}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{fullName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={21} color="#91A1BA" />
            <View style={styles.infoContent}>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>{user?.email}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
              <Text style={styles.logoutText}>Logout</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  header: {
    backgroundColor: "#151C32",
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 45,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#30384F",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#151C32",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 18,
  },
  email: {
    color: "#91A1BA",
    fontSize: 13,
    marginTop: 6,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginTop: 35,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 8,
  },
  infoContent: {
    flex: 1,
  },
  label: {
    color: "#91A1BA",
    fontSize: 11,
  },
  value: {
    color: "#151C32",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#EDF0F4",
    marginVertical: 12,
  },
  logoutButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#151C32",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
