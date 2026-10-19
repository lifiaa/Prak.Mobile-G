import { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
  Switch,
  Image,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles, themeColors } from "../styles";
import { useTheme } from "../context/ThemeContext";
import { pets } from "../data/pets";
import { SafeAreaView } from "react-native-safe-area-context";

type CareTask = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type Appointment = {
  id: string;
  petId: string;
  title: string;
  date: string;
  time: string;
  location: string;
};

const careTasks: CareTask[] = [
  {
    id: "feeding",
    title: "Jadwal Makan",
    description: "Pastikan makanan dan air minum tersedia sesuai rutinitas.",
    category: "RUTINITAS HARIAN",
    icon: "restaurant-outline",
  },
  {
    id: "health",
    title: "Pemeriksaan Kesehatan",
    description: "Perhatikan nafsu makan, aktivitas, dan kondisi tubuh.",
    category: "PEMANTAUAN KESEHATAN",
    icon: "heart-outline",
  },
  {
    id: "cleanliness",
    title: "Kebersihan Hewan",
    description: "Periksa kebersihan bulu, telinga, dan tempat tinggal.",
    category: "KEBERSIHAN",
    icon: "water-outline",
  },
];

const appointments: Appointment[] = [
  {
    id: "aya-grooming",
    petId: "aya",
    title: "Grooming",
    date: "2026-10-22",
    time: "10:00",
    location: "Klinik Grooming",
  },
  {
    id: "aya-consultation",
    petId: "aya",
    title: "Konsultasi Dokter",
    date: "2026-10-25",
    time: "14:00",
    location: "Klinik Hewan",
  },
  {
    id: "milo-consultation",
    petId: "milo",
    title: "Konsultasi Dokter",
    date: "2026-10-28",
    time: "09:30",
    location: "Klinik Hewan",
  },
  {
    id: "loopy-grooming",
    petId: "loopy",
    title: "Grooming",
    date: "2026-11-05",
    time: "11:00",
    location: "Klinik Grooming",
  },
];

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Home() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  // STATUS TUGAS PERAWATAN
  const [completedTasks, setCompletedTasks] = useState<
    Record<string, boolean>
  >({});

  const completedCount = careTasks.filter(
    (task) => completedTasks[task.id]
  ).length;

  const totalTasks = careTasks.length;
  const progress = totalTasks
    ? Math.round((completedCount / totalTasks) * 100)
    : 0;

  // FILTER JADWAL PERAWATAN BULAN INI DAN MASA DEPAN
  const upcomingAppointments = useMemo(() => {
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    return appointments
      .filter((appointment) => {
        const [year, month, day] = appointment.date
          .split("-")
          .map(Number);

        const appointmentDate = new Date(year, month - 1, day);
        return appointmentDate >= today;
      })
      .filter((appointment) => {
        const petExists = pets.some(
          (pet) => pet.id === appointment.petId
        );
        return petExists;
      })
      .sort((a, b) =>
        `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
      );
  }, []);

  // AKSI CEPAT
  const quickActions = [
    {
      title: "My Pets",
      subtitle: "Kelola hewan peliharaan",
      icon: "paw" as const,
      onPress: () => router.push("/pets"),
    },
    {
      title: "Schedule",
      subtitle: "Jadwal perawatan hewan",
      icon: "calendar-outline" as const,
      onPress: () =>{
        ToastAndroid.show("Fitur Schedule belum tersedia.", ToastAndroid.SHORT)
      }
    },
    {
      title: "Add Pet",
      subtitle: "Tambahkan hewan peliharaan",
      icon: "add-circle-outline" as const,
      onPress: () => router.push("/add-pet"),
    },
  ];

  return (
  <SafeAreaView
    edges={["top"]}
    style={{
      flex: 1,
      backgroundColor: theme.background,
    }}
  >
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* HEADER */}
        <View style={[styles.header, {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 12,
            backgroundColor: theme.background,
            // borderBottomWidth: 1,
            borderBottomColor: theme.border,
            // elevation: 4,
            zIndex: 10,
          },]}
        >
          <View style={styles.brand}>
            <View
              style={[
                styles.logo,
                {
                  backgroundColor: darkMode ? "#C0CAD6" : "#263B55",
                },
              ]}
            >
              <Ionicons
                name="paw"
                size={25}
                color={darkMode ? "#101827" : "#FFFFFF"}
              />
            </View>

            <Text style={styles.brandName}>
              <Text style={{ color: theme.text }}>Pet</Text>
              <Text style={{ color: theme.secondary }}>Care+</Text>
            </Text>
          </View>

          <View style={styles.themeControl}>
            <Ionicons
              name={darkMode ? "moon" : "sunny-outline"}
              size={19}
              color={theme.text}
            />
            <Switch
              value={darkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#CBD5E1", true: "#64748B" }}
              thumbColor={darkMode ? "#F1F5F9" : "#FFFFFF"}
            />
          </View>
        </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 36 }}
      >

        {/* GREETING */}
        <View style={styles.greeting}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.greetingTitle,
                { color: theme.text },
              ]}
            >
              Halo, Momma! 👋
            </Text>
            <Text
              style={[
                styles.greetingSubtitle,
                { color: theme.subtitle },
              ]}
            >
            Hewan kesayanganmu sudah menunggu {"\n"}
              untuk perawatan hari ini.
            </Text>
          </View>

          {/* Fitur AI Assistant */}
          <Pressable
            onPress={() => router.push("/petCareAI")}
            style={[
              styles.greetingBadge,
              {
                backgroundColor: darkMode ? "#24364B" : "#E2E8F0",
                borderColor: theme.border,
                width: 60,
                height: 60,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 8,
                paddingHorizontal: 6,
              },
            ]}
          >
          <Ionicons
            name="sparkles-outline"
            size={25}
            color={theme.accent}
          />
          <Text
            style={{
              color: theme.accent,
              fontSize: 11,
              fontWeight: "700",
              marginTop: 4,
            }}
          >
            Tanya AI
          </Text>
          </Pressable>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <Text
            style={[
              styles.eyebrow,
              { color: theme.accent },
            ]}
          >
            SISTEM PETCARE / 01
          </Text>
          {/* <Text
            style={[
              styles.heroTitle,
              { color: theme.text },
            ]}
          >
            Dunia hewan kesayanganmu,
          </Text>
          <Text
            style={[
              styles.heroAccent,
              { color: theme.accent },
            ]}
          >
            dalam satu kendali.
          </Text> */}
          <Text
            style={[
              styles.description,
              { color: theme.subtitle },
            ]}
          >
            Perawatan tepat. Ikatan erat. Hewan lebih sehat.
          </Text>
        </View>

        {/* DASHBOARD DAN STATISTIK */}
        <View
          style={[
            styles.dashboard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View>
              <Text
                style={[
                  styles.eyebrow,
                  { color: theme.subtitle },
                ]}
              >
                RINGKASAN PETCARE
              </Text>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: theme.text },
                ]}
              >
                Dashboard
              </Text>
            </View>

            <Ionicons
              name="analytics-outline"
              size={27}
              color={theme.accent}
            />
          </View>

          <View style={styles.statsRow}>
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: darkMode ? "#24364B" : "#F1F5F9",
                },
              ]}
            >
              <Ionicons
                name="paw-outline"
                size={23}
                color={theme.accent}
              />
              <Text
                style={[
                  styles.statNumber,
                  { color: theme.text },
                ]}
              >
                {pets.length.toString().padStart(2, "0")}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.subtitle },
                ]}
              >
                Hewan Terdaftar
              </Text>
            </View>

            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: darkMode ? "#24364B" : "#F1F5F9",
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={23}
                color={theme.accent}
              />
              <Text
                style={[
                  styles.statNumber,
                  { color: theme.text },
                ]}
              >
                {completedCount}/{totalTasks}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.subtitle },
                ]}
              >
                Tugas Selesai
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 7,
              backgroundColor: theme.border,
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 16,
            }}
          >
            <View
              style={{
                width: `${progress}%`,
                height: 7,
                backgroundColor: "#22C55E",
                borderRadius: 10,
              }}
            />
          </View>
          <Text
            style={{
              color: theme.subtitle,
              fontSize: 12,
              marginTop: 7,
              textAlign: "right",
            }}
          >
            {progress}% tugas perawatan selesai
          </Text>
        </View>

        
        {/* CARE INSIGHT */}
        <View
          style={[
            styles.insight,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.insightHeader}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color={theme.accent}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text
                style={[
                  styles.insightTitle,
                  { color: theme.text },
                ]}
              >
                Care Insight
              </Text>
              <Text
                style={{
                  color: theme.subtitle,
                  fontSize: 12,
                  marginTop: 3,
                }}
              >
                Ringkasan perawatan harian
              </Text>
            </View>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    completedCount === totalTasks
                      ? "#22C55E"
                      : "#F59E0B",
                },
              ]}
            />
            <Text
              style={[
                styles.eyebrow,
                { color: theme.subtitle },
              ]}
            >
              {completedCount === totalTasks
                ? "SELESAI"
                : `${totalTasks - completedCount} TERSISA`}
            </Text>
          </View>

          <View style={{ marginTop: 22, marginBottom: 12 }}>
            <Text
              style={{
                color: theme.text,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Rencana perawatan hari ini
            </Text>
            <Text
              style={{
                color: theme.subtitle,
                fontSize: 13,
                marginTop: 4,
              }}
            >
              Centang setiap tugas setelah selesai dilakukan.
            </Text>
          </View>

          {careTasks.map((task) => {
            const isCompleted = Boolean(completedTasks[task.id]);

            return (
              <Pressable
                key={task.id}
                onPress={() =>
                  setCompletedTasks((previous) => ({
                    ...previous,
                    [task.id]: !previous[task.id],
                  }))
                }
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  paddingVertical: 14,
                  borderTopWidth: 1,
                  borderColor: theme.border,
                }}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    backgroundColor: theme.field,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name={task.icon}
                    size={21}
                    color={theme.accent}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 14,
                      fontWeight: "700",
                      textDecorationLine: isCompleted
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.title}
                  </Text>
                  <Text
                    style={{
                      color: theme.subtitle,
                      fontSize: 12,
                      lineHeight: 18,
                      marginTop: 5,
                    }}
                  >
                    {task.description}
                  </Text>
                  <Text
                    style={{
                      color: isCompleted ? "#22C55E" : theme.accent,
                      fontSize: 11,
                      fontWeight: "600",
                      marginTop: 7,
                    }}
                  >
                    {isCompleted ? "SELESAI" : task.category}
                  </Text>
                </View>

                <Ionicons
                  name={
                    isCompleted
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={24}
                  color={isCompleted ? "#22C55E" : theme.secondary}
                />
              </Pressable>
            );
          })}

          <Text
            style={{
              color: theme.subtitle,
              fontSize: 12,
              marginTop: 10,
              textAlign: "right",
            }}
          >
            {completedCount} dari {totalTasks} tugas selesai
          </Text>
        </View>


        {/* PERAWATAN TERDEKAT */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text
                style={[
                  styles.eyebrow,
                  { color: theme.subtitle },
                ]}
              >
                AKTIVITAS MENDATANG
              </Text>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: theme.text },
                ]}
              >
                Perawatan Terdekat
              </Text>
            </View>

            <Ionicons
              name="calendar-outline"
              size={25}
              color={theme.accent}
            />
          </View>

          {upcomingAppointments.length === 0 ? (
            <View
              style={[
                styles.upcomingCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  padding: 18,
                },
              ]}
            >
              <Ionicons
                name="calendar-clear-outline"
                size={28}
                color={theme.secondary}
              />
              <Text
                style={{
                  color: theme.text,
                  fontSize: 15,
                  fontWeight: "700",
                  marginTop: 10,
                }}
              >
                Belum ada jadwal perawatan
              </Text>
              <Text
                style={{
                  color: theme.subtitle,
                  fontSize: 13,
                  marginTop: 5,
                }}
              >
                Jadwal perawatan berikutnya akan muncul di sini.
              </Text>
            </View>
          ) : (
            upcomingAppointments.map((appointment) => {
              const pet = pets.find(
                (item) => item.id === appointment.petId
              );

              if (!pet) return null;

              const petImage =
                appointment.petId === "aya"
                  ? require("../../assets/cats/aya.jpeg")
                  : appointment.petId === "loopy"
                    ? require("../../assets/cats/loopy.jpeg")
                    : appointment.petId === "milo"
                      ? require("../../assets/cats/milo.jpeg")
                      : null;

              const isGrooming = appointment.title
                .toLowerCase()
                .includes("grooming");

              return (
                <View
                  key={appointment.id}
                  style={[
                    styles.upcomingCard,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      padding: 16,
                      marginBottom: 12,
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  ]}
                >
                  {/* FOTO PROFIL HEWAN DI KIRI */}
                  {petImage ? (
                    <Image
                      source={petImage}
                      resizeMode="cover"
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 15,
                        marginRight: 16,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 30,
                        backgroundColor: darkMode
                          ? "#24364B"
                          : "#E2E8F0",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 16,
                      }}
                    >
                      <Ionicons
                        name="paw"
                        size={28}
                        color={theme.accent}
                      />
                    </View>
                  )}

                  {/* INFORMASI JADWAL DI TENGAH */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: theme.text,
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      {pet.name} — {appointment.title}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <Ionicons
                        name="calendar-outline"
                        size={15}
                        color={theme.subtitle}
                      />
                      <Text
                        style={{
                          color: theme.subtitle,
                          fontSize: 12,
                          marginLeft: 6,
                          flexShrink: 1,
                        }}
                      >
                        {formatDate(appointment.date)}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 6,
                      }}
                    >
                      <Ionicons
                        name="time-outline"
                        size={15}
                        color={theme.subtitle}
                      />
                      <Text
                        style={{
                          color: theme.subtitle,
                          fontSize: 12,
                          marginLeft: 6,
                        }}
                      >
                        Pukul {appointment.time} WIB
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: theme.accent,
                        fontSize: 12,
                        marginTop: 6,
                      }}
                    >
                      {appointment.location}
                    </Text>
                  </View>

                  {/* IKON JENIS PERAWATAN DI KANAN */}
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      backgroundColor: darkMode
                        ? "#24364B"
                        : "#E2E8F0",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 12,
                    }}
                  >
                    <Ionicons
                      name={
                        isGrooming
                          ? "cut-outline"
                          : "medkit-outline"
                      }
                      size={25}
                      color={theme.accent}
                    />
                  </View>
                </View>
              );
            })
          )}
        </View>


        {/* QUICK ACCESS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: theme.text },
                ]}
              >
                Quick Access
              </Text>
              <Text
                style={[
                  styles.description,
                  { color: theme.subtitle },
                ]}
              >
                Semua kebutuhan dalam satu tempat
              </Text>
            </View>
            <Ionicons
              name="arrow-forward-circle-outline"
              size={25}
              color={theme.accent}
            />
          </View>

          <View style={styles.actionList}>
            {quickActions.map((action) => (
              <Pressable
                key={action.title}
                onPress={action.onPress}
                style={({ pressed }) => [
                  styles.actionCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    opacity: pressed ? 0.75 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.actionIconContainer,
                    {
                      backgroundColor: darkMode
                        ? "#24364B"
                        : "#E2E8F0",
                    },
                  ]}
                >
                  <Ionicons
                    name={action.icon}
                    size={23}
                    color={theme.accent}
                  />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text
                    style={[
                      styles.actionTitle,
                      { color: theme.text },
                    ]}
                  >
                    {action.title}
                  </Text>
                  <Text
                    style={[
                      styles.actionSubtitle,
                      { color: theme.subtitle },
                    ]}
                  >
                    {action.subtitle}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={19}
                  color={theme.subtitle}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              { color: theme.subtitle },
            ]}
          >
            PETCARE OS / V3.0
          </Text>
          <View style={styles.systemStatus}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: "#22C55E" },
              ]}
            />
            <Text
              style={[
                styles.footerText,
                { color: theme.subtitle },
              ]}
            >
              SISTEM AKTIF
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
  );
}
