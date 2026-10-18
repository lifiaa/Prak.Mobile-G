import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { pets } from "../../data/pets";
import { styles } from "../../styles";
import { useTheme } from "../../context/ThemeContext";
import { themeColors } from "../../styles";

export default function PetDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { darkMode } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;
  
  const pet = pets.find((item) => item.id === id);

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.petListTitle}>
          Hewan tidak ditemukan
        </Text>

        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/pets");
            }
          }}
          style={{
            marginTop: 24,
            marginBottom: 12,
            paddingVertical: 10,
            paddingHorizontal: 4,
            alignSelf: "flex-start",}}
        >
        <Text style={[styles.seeAll, {fontSize: 15, fontWeight: "700",},]}>‹ Kembali</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
  style={[
    styles.container,
    { backgroundColor: theme.background },
  ]}
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}>
      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/pets");
          }
        }}
        style={{
          alignSelf: "flex-start",
          marginBottom: 22,
        }}
      >
        <Text
          style={{
            color: darkMode ? "#A8E0BC" : "#287A5B",
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          ‹ Kembali
        </Text>
      </Pressable>

      <View style={styles.petDetailImageContainer}>
        <Image source={pet.image} style={styles.petDetailImage}/>
      </View>

      <Text style={[styles.petDetailName, { color: theme.text }]}>
        {pet.name}
      </Text>

      <Text style={[styles.petDetailBreed, { color: theme.subtitle }]}>
        {pet.breed}
      </Text>

      <View style={[styles.petDetailInfo,   { backgroundColor: theme.card },]}>
        <Text style={[styles.petDetailLabel, { color: theme.subtitle }]}>
          Jenis
        </Text>

        <Text style={[styles.petDetailValue, { color: theme.subtitle }]}>
          {pet.type}
        </Text>

        <Text style={[styles.petDetailLabel, { color: theme.subtitle }]}>
          Umur
        </Text>

        <Text style={[styles.petDetailValue, { color: theme.subtitle }]}>
          {pet.age} tahun
        </Text>

        <Text style={[styles.petDetailLabel, { color: theme.subtitle }]}>
          Kategori Usia
        </Text>

        <Text style={[styles.petDetailValue, { color: theme.subtitle }]}>
          {pet.ageCategories}
        </Text>
      </View>

      <Text style={[styles.petDetailDescription,{backgroundColor: theme.card, color: theme.subtitle,},]}>
        {pet.description}
      </Text>
    </ScrollView>
  );
}