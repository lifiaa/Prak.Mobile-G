import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { pets } from "../../data/pets";
import { styles, themeColors } from "../../styles";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePets } from "../../context/PetContext";

export default function PetList() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { pets } = usePets();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  return (
  <SafeAreaView
  edges={["top"]}
    style={{
      flex: 1,
      backgroundColor: theme.background,
    }}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 16,
          backgroundColor: theme.background,
          // borderBottomWidth: 1,
          borderBottomColor: theme.border,
          // elevation: 4,
          zIndex: 10,
        }}
      >
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={theme.text}
          />
        </Pressable>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: theme.text,
              fontSize: 15,
              fontWeight: "800",
            }}
          >
            PetCare+
          </Text>
          <Text
            style={{
              color: theme.subtitle,
              fontSize: 10,
              letterSpacing: 1.5,
              marginTop: 3,
            }}
          >
            KOLEKSI HEWAN
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/add-pet")}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.button,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Ionicons
            name="add"
            size={25}
            color={theme.buttonText}
          />
        </Pressable>
      </View>
      
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 36,
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* JUDUL HALAMAN */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            color: theme.accent,
            fontSize: 11,
            fontWeight: "800",
            letterSpacing: 2,
            marginBottom: 9,
          }}
        >
          TEMAN BERBULU KAMU
        </Text>

        <Text
          style={{
            color: theme.text,
            fontSize: 30,
            fontWeight: "900",
            letterSpacing: -0.8,
            // marginBottom: 8,
          }}
        >
          Hewan Peliharaan
        </Text>
      </View>

      {/* RINGKASAN JUMLAH HEWAN */}
      {/* <View
        style={{
          backgroundColor: theme.button,
          borderRadius: 24,
          padding: 22,
          marginBottom: 28,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: darkMode ? "#262929" : "#CBD5E1",
                fontSize: 11,
                fontWeight: "700",
                letterSpacing: 1.3,
              }}
            >
              TOTAL HEWAN TERDAFTAR
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  color: theme.buttonText,
                  fontSize: 38,
                  fontWeight: "900",
                }}
              >
                {pets.length.toString().padStart(2, "0")}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: 62,
              height: 62,
              borderRadius: 21,
              backgroundColor: darkMode
                ? "#34465B"
                : "#40546F",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="paw"
              size={31}
              color={theme.buttonText}
            />
          </View>
        </View>
      </View> */}

      {/* DAFTAR HEWAN */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View>
          <Text
            style={{
              color: theme.text,
              fontSize: 19,
              fontWeight: "800",
            }}
          >
            Profil Hewan
          </Text>
          <Text
            style={{
              color: theme.subtitle,
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Pilih kartu untuk melihat detail
          </Text>
        </View>

        <View
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            paddingHorizontal: 11,
            paddingVertical: 7,
            borderRadius: 11,
          }}
        >
          <Text
            style={{
              color: theme.accent,
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {pets.length} Hewan
          </Text>
        </View>
      </View>

      {pets.length === 0 ? (
        <View
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 22,
            padding: 28,
            alignItems: "center",
          }}
        >
          <Ionicons
            name="paw-outline"
            size={42}
            color={theme.secondary}
          />
          <Text
            style={{
              color: theme.text,
              fontSize: 16,
              fontWeight: "800",
              marginTop: 14,
            }}
          >
            Belum Ada Hewan
          </Text>
          <Text
            style={{
              color: theme.subtitle,
              fontSize: 13,
              textAlign: "center",
              lineHeight: 20,
              marginTop: 6,
            }}
          >
            Tambahkan hewan peliharaan untuk mulai membuat profil.
          </Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: 16,
          }}
        >
          {pets.map((pet) => (
            <Pressable
              key={pet.id}
              onPress={() =>
                router.push({
                  pathname: "/pets/[id]",
                  params: { id: pet.id },
                })
              }
              style={({ pressed }) => ({
                width: "48%",
                backgroundColor: theme.card,
                borderRadius: 22,
                padding: 11,
                borderWidth: 1,
                borderColor: theme.border,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              {/* FOTO HEWAN */}
              <View
                style={{
                  position: "relative",
                  marginBottom: 13,
                }}
              >
                <Image
                  source={pet.image}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 135,
                    borderRadius: 16,
                    backgroundColor: theme.field,
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    top: 9,
                    right: 9,
                    width: 31,
                    height: 31,
                    borderRadius: 11,
                    backgroundColor: theme.card,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name="paw"
                    size={16}
                    color={theme.accent}
                  />
                </View>
              </View>

              {/* IDENTITAS HEWAN DAN TOMBOL DETAIL */}
              <View style={{ flex: 1, gap: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                  }}
                >
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 16,
                      fontWeight: "700",
                      flex: 1,
                    }}
                    numberOfLines={1}
                  >
                    {pet.name}
                  </Text>

                  <Pressable
                    onPress={() => router.push(`/pets/${pet.id}`)}
                    style={{
                      backgroundColor: theme.accent,
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.buttonText,
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      Detail
                    </Text>
                  </Pressable>
                </View>

                <Text
                  style={{
                    color: theme.subtitle,
                    fontSize: 12,
                  }}
                  numberOfLines={1}
                >
                  {pet.breed}
                </Text>

                <Text
                  style={{
                    color: theme.subtitle,
                    fontSize: 12,
                  }}
                >
                  {pet.age} tahun
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}

      {/* TOMBOL TAMBAH HEWAN */}
      {/* <Pressable
        onPress={() => router.push("/add-pet")}
        style={({ pressed }) => ({
          backgroundColor: theme.button,
          minHeight: 57,
          borderRadius: 17,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 26,
          gap: 10,
          opacity: pressed ? 0.75 : 1,
        })}
      >
        <Ionicons
          name="add-circle-outline"
          size={22}
          color={theme.buttonText}
        />
        <Text
          style={{
            color: theme.buttonText,
            fontSize: 15,
            fontWeight: "800",
          }}
        >
          Tambah Hewan
        </Text>
      </Pressable> */}

      {/* FOOTER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          gap: 7,
        }}
      >
        <Ionicons
          name="heart"
          size={13}
          color={theme.secondary}
        />
        <Text
          style={{
            color: theme.subtitle,
            fontSize: 11,
          }}
        >
          Dibuat dengan kasih sayang untuk hewan kesayanganmu
        </Text>
      </View>
    </ScrollView>
    </View>
  </SafeAreaView>
  );
}