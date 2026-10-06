import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { pets } from "../../data/pets";
import { styles } from "../../styles";

export default function PetDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

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
        >
          <Text style={styles.seeAll}>‹ Kembali</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/pets");
          }
        }}
      >
        <Text style={styles.seeAll}>‹ Kembali</Text>
      </Pressable>

      <View style={styles.petDetailImageContainer}>
        <Text style={styles.petDetailEmoji}>
          {pet.emoji}
        </Text>
      </View>

      <Text style={styles.petDetailName}>
        {pet.name}
      </Text>

      <Text style={styles.petDetailBreed}>
        {pet.breed}
      </Text>

      <View style={styles.petDetailInfo}>
        <Text style={styles.petDetailLabel}>
          Jenis
        </Text>

        <Text style={styles.petDetailValue}>
          {pet.type}
        </Text>

        <Text style={styles.petDetailLabel}>
          Umur
        </Text>

        <Text style={styles.petDetailValue}>
          {pet.age} tahun
        </Text>
      </View>

      <Text style={styles.petDetailDescription}>
        {pet.description}
      </Text>
    </ScrollView>
  );
}