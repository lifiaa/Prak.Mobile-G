import { View, Text, ScrollView, Pressable, ToastAndroid } from "react-native";
import { styles } from "../styles";

export default function Index() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>
            Pet<Text style={styles.appNameGreen}>Care</Text> <Text style={styles.paw}>🐾</Text>
          </Text>
        </View>

        <Pressable style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>
      </View>

      <Text style={styles.greeting}>Halo, Momma!</Text>

      <Text style={styles.subtitle}>
        Jangan lupa rawat hewan kesayanganmu hari ini.
      </Text>

      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, styles.animalCard]}>
          {/* <Text style={styles.summaryIcon}>🐾</Text> */}
          <Text style={styles.summaryNumber}>2</Text>
          <Text style={styles.summaryLabel}>Hewan</Text>
        </View>

        <View style={[styles.summaryCard, styles.careCard]}>
          {/* <Text style={styles.summaryIcon}>📅</Text> */}
          <Text style={styles.summaryNumber}>3</Text>
          <Text style={styles.summaryLabel}>Perawatan</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Perawatan Terdekat</Text>

        <Pressable>
          <Text style={styles.seeAll}>Lihat Semua ›</Text>
        </Pressable>
      </View>

      <Pressable style={styles.careCardLarge}>
        <View style={styles.careInfo}>
          <View style={styles.careEmojiContainer}>
            <Text style={styles.careEmoji}>🐱</Text>
          </View>

          <View>
            <Text style={styles.careName}>Aya</Text>
            <Text style={styles.careType}>Jadwal makan</Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.time}>◷ 18:00</Text>
        </View>
      </Pressable>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Hewan Peliharaan</Text>

        <Pressable>
          <Text style={styles.seeAll}>Lihat Semua ›</Text>
        </Pressable>
      </View>

      <View style={styles.petsContainer}>
        <Pressable style={styles.petCard}>
          <View style={[styles.petImageContainer, styles.ayaBackground]}>
            <Text style={styles.petEmoji}>🐱</Text>
          </View>

          <Text style={styles.petName}>Aya</Text>
          <Text style={styles.petBreed}>Himalayan</Text>
        </Pressable>

        <Pressable style={styles.petCard}>
          <View style={[styles.petImageContainer, styles.loopyBackground]}>
            <Text style={styles.petEmoji}>🐱</Text>
          </View>

          <Text style={styles.petName}>Loopy</Text>
          <Text style={styles.petBreed}>Domestic</Text>
        </Pressable>
      </View>

      <Pressable style={styles.actionButton} onPress={() => ToastAndroid.show("Jadwal Tidak Tersedia!", ToastAndroid.SHORT)}>
        <Text style={styles.actionIcon}>📅</Text>
        <Text style={styles.actionText}>Lihat Jadwal</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.actionButtonOutline} onPress={() => ToastAndroid.show("Fitur ini belum tersedia!", ToastAndroid.SHORT)}>
        <Text style={styles.actionIcon}>＋</Text>
        <Text style={styles.actionTextOutline}>Tambah Hewan</Text>
        <Text style={styles.arrowOutline}>›</Text>
      </Pressable>
    </ScrollView>
  );
}