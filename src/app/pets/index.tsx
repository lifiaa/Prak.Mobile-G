import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { pets } from "../../data/pets";
import { styles } from "../../styles";

export default function PetList() {
  const router = useRouter();

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
            router.replace("/");
            }
        }}
        >
        <Text style={styles.seeAll}>‹ Kembali</Text>
        </Pressable>

      <Text style={styles.petListTitle}>
        Hewan Peliharaan
      </Text>

      <Text style={styles.petListSubtitle}>
        Daftar hewan peliharaanmu
      </Text>

      <View style={styles.petListContainer}>
        {pets.map((pet) => (
            <Pressable
            key={pet.id}
            style={styles.petListCard}
            onPress={() =>
            router.push({
                pathname: "/pets/[id]",
                params: { id: pet.id },
            })
            }
            >
            <View style={styles.petListImageContainer}>
              <Text style={styles.petListEmoji}>
                {pet.emoji}
              </Text>
            </View>

            <Text style={styles.petListName}>
              {pet.name}
            </Text>

            <Text style={styles.petListBreed}>
              {pet.breed}
            </Text>

            <Text style={styles.petListAge}>
              {pet.age} tahun
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}