import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermission = async () => {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    throw new Error("Izin notifikasi tidak diberikan");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("petcare-reminders", {
      name: "Pengingat PetCare",
      importance: Notifications.AndroidImportance.MAX,
      sound: "default",
    });
  }
};

export const schedulePetReminder = async (
  title: string,
  body: string,
  seconds: number
) => {
  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: "petcare-reminders",
    },
  });
};
