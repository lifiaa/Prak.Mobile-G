
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
      <View style={styles.header}>
        <Text style={styles.title}>Notification</Text>
        <Text style={styles.subtitle}>
          Jangan lewatkan jadwal perawatan hewan kesayanganmu.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="notifications-outline"
            size={32}
            color="#293B59"
          />
        </View>

        <Text style={styles.cardTitle}>Pengingat PetCare</Text>

        <Text style={styles.cardDescription}>
          Aktifkan pengingat agar kamu selalu ingat untuk
          memperhatikan kebutuhan hewan peliharaanmu.
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleReminder}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons
                name="notifications"
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>
                Jadwalkan Pengingat
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.note}>
          Pengingat saat ini merupakan notifikasi uji coba
          yang akan muncul dalam 10 detik.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 24,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#293B59",
  },
  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 8,
    lineHeight: 21,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    elevation: 2,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#EEF1F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#293B59",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 24,
  },
  button: {
    width: "100%",
    backgroundColor: "#293B59",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  note: {
    fontSize: 12,
    color: "#999999",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 16,
  },
});
