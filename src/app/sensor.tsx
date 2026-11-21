import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function SensorScreen() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let subscription: ReturnType<typeof Accelerometer.addListener>;

    Accelerometer.isAvailableAsync().then((result) => {
      setAvailable(result);

      if (result) {
        Accelerometer.setUpdateInterval(500);

        subscription = Accelerometer.addListener(setData);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetCare Sensor</Text>
      <Text style={styles.subtitle}>Accelerometer</Text>

      {available === null ? (
        <Text>Memeriksa sensor...</Text>
      ) : available ? (
        <>
          <Text>Sensor berhasil diaktifkan</Text>
          <Text>X: {data.x.toFixed(3)}</Text>
          <Text>Y: {data.y.toFixed(3)}</Text>
          <Text>Z: {data.z.toFixed(3)}</Text>
        </>
      ) : (
        <Text>Accelerometer tidak tersedia</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
  },
});
