import { useEffect, useState } from "react";
import {
  View,
  Text,
  AppState,
  AppStateStatus,
  StyleSheet,
} from "react-native";

export default function LifecycleScreen() {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );

  const [lastState, setLastState] = useState("Belum ada perubahan");

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState) => {
        setLastState(`${appState} → ${nextState}`);
        setAppState(nextState);
      }
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetCare App Lifecycle</Text>

      <Text style={styles.label}>Status Aplikasi:</Text>
      <Text style={styles.status}>{appState}</Text>

      <Text style={styles.label}>Perubahan Terakhir:</Text>
      <Text style={styles.value}>{lastState}</Text>
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
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#777",
  },
  status: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#304B3D",
  },
  value: {
    fontSize: 16,
  },
});
