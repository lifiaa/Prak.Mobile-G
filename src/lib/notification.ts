import { Alert, Platform } from "react-native";

export const showMessage = (
  title: string,
  message: string,
  onConfirm?: () => void
) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
    onConfirm?.();
    return;
  }

  Alert.alert(title, message, [
    {
      text: "OK",
      onPress: onConfirm,
    },
  ]);
};
