import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
} from "react-native";

export default function TelephonyScreen() {
  const [phone, setPhone] = useState("");

  const handleCall = async () => {
    if (!phone.trim()) {
      Alert.alert("Perhatian", "Masukkan nomor telepon terlebih dahulu.");
      return;
    }

    const url = `tel:${phone.trim()}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Fitur panggilan tidak tersedia.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hubungi Dokter Hewan</Text>
      <Text style={styles.subtitle}>
        Masukkan nomor telepon dokter hewan untuk melakukan panggilan.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Contoh: 081234567890"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleCall}>
        <Text style={styles.buttonText}>Hubungi Sekarang</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
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
