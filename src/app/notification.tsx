import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import {
  requestNotificationPermission,
  schedulePetReminder,
} from "../services/notificationService";

export default function NotificationScreen() {
  const [loading, setLoading] = useState(false);

  const handleReminder = async () => {
    try {
      setLoading(true);

      await requestNotificationPermission();

      await schedulePetReminder(
        "Pengingat PetCare 🐾",
        "Jangan lupa merawat hewan peliharaanmu hari ini!",
        10
      );

      Alert.alert(
        "Berhasil",
        "Pengingat berhasil dijadwalkan dalam 10 detik."
      );
    } catch (error) {
      Alert.alert(
        "Gagal",
        error instanceof Error ? error.message : "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetCare Reminder 🔔</Text>
      <Text style={styles.subtitle}>
        Atur pengingat perawatan hewan peliharaan.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleReminder}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Memproses..." : "Jadwalkan Pengingat"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 18,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    color: "#777",
  },
  button: {
    backgroundColor: "#293B59",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
