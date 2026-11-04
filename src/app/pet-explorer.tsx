
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../styles";

export default function PetExplorerScreen() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
      }}>
        <TouchableOpacity
          onPress={() => router.canGoBack() ? router.back() : router.replace("/")}
          style={{
            width: 44,
            height: 44,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.text, fontSize: 15, fontWeight: "800" }}>
            PetCare+
          </Text>
          <Text style={{ color: theme.subtitle, fontSize: 10, letterSpacing: 1.5, marginTop: 3 }}>
            PET DISCOVERY
          </Text>
        </View>

        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 35 }}>
        <Text style={{
          color: theme.accent,
          fontSize: 11,
          fontWeight: "700",
          letterSpacing: 1.5,
        }}>
          EXPLORE THE ANIMAL WORLD
        </Text>

        <Text style={{
          color: theme.text,
          fontSize: 29,
          fontWeight: "800",
          marginTop: 9,
        }}>
          Meet Your New{"\n"}Furry Friends!
        </Text>

        <Text style={{
          color: theme.subtitle,
          fontSize: 14,
          lineHeight: 22,
          marginTop: 10,
          marginBottom: 25,
        }}>
          Discover different breeds, learn their personalities, and explore the wonderful world of cats and dogs.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/pet-explorer/cats")}
          activeOpacity={0.85}
          style={{
            backgroundColor: theme.card,
            borderRadius: 20,
            padding: 13,
            borderWidth: 1,
            borderColor: theme.border,
            marginBottom: 18,
          }}
        >
          <Image
            source={{ uri: "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg" }}
            style={{ width: "100%", height: 190, borderRadius: 14 }}
            resizeMode="cover"
          />

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 14,
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: "800" }}>
                Cat Explorer 🐱
              </Text>
              <Text style={{ color: theme.subtitle, fontSize: 13, marginTop: 6 }}>
                Explore cat breeds and their unique personalities.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={30} color={theme.accent} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/pet-explorer/dogs")}
          activeOpacity={0.85}
          style={{
            backgroundColor: theme.card,
            borderRadius: 20,
            padding: 13,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Image
            source={{ uri: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg" }}
            style={{ width: "100%", height: 190, borderRadius: 14 }}
            resizeMode="cover"
          />

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 14,
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: "800" }}>
                Dog Explorer 🐶
              </Text>
              <Text style={{ color: theme.subtitle, fontSize: 13, marginTop: 6 }}>
                Discover dog breeds, origins, and characteristics.
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={30} color={theme.accent} />
          </View>
        </TouchableOpacity>

        <Text style={{
          color: theme.subtitle,
          fontSize: 11,
          textAlign: "center",
          marginTop: 25,
        }}>
          Powered by TheCatAPI & TheDogAPI
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
