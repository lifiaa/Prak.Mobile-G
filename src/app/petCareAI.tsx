import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../styles";
import { getPetCareAnswer } from "../utils/petCareAI";
import { SafeAreaView } from "react-native-safe-area-context";

type ChatMessage = {
  id: string;
  text: string;
  from: "user" | "ai";
};

export default function PetCareAI() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      from: "ai",
      text: "Halo! Aku PetCare AI. Kamu bisa bertanya tentang Aya, Loopy, Milo, atau seputar perawatan kucing.",
    },
  ]);

  const sendMessage = () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const answer = getPetCareAnswer(trimmedQuestion);
    const timestamp = Date.now().toString();

    setMessages((current) => [
      ...current,
      { id: `${timestamp}-user`, text: trimmedQuestion, from: "user" },
      { id: `${timestamp}-ai`, text: answer, from: "ai" },
    ]);

    setQuestion("");
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 18,
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{ padding: 8, marginRight: 8 }}
          >
            <Ionicons name="arrow-back" size={23} color={theme.text} />
          </Pressable>

          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: darkMode ? "#24364B" : "#E2E8F0",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Ionicons name="sparkles" size={23} color={theme.accent} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              PetCare AI
            </Text>
            <Text
              style={{
                color: theme.subtitle,
                fontSize: 12,
                marginTop: 3,
              }}
            >
              Asisten perawat hewan kesayanganmu
            </Text>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 18, gap: 14 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => {
            const isUser = message.from === "user";

            return (
              <View
                key={message.id}
                style={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  backgroundColor: isUser ? theme.accent : theme.card,
                  borderWidth: isUser ? 0 : 1,
                  borderColor: theme.border,
                  borderRadius: 18,
                  borderBottomRightRadius: isUser ? 5 : 18,
                  borderBottomLeftRadius: isUser ? 18 : 5,
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={{
                    color: isUser ? "#FFFFFF" : theme.text,
                    fontSize: 14,
                    lineHeight: 21,
                  }}
                >
                  {message.text}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: theme.border,
            gap: 10,
          }}
        >
          <TextInput
            value={question}
            onChangeText={setQuestion}
            placeholder="Tanyakan tentang hewanmu..."
            placeholderTextColor={theme.subtitle}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            style={{
              flex: 1,
              minHeight: 46,
              maxHeight: 100,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 10,
              color: theme.text,
              backgroundColor: theme.card,
            }}
          />

          <Pressable
            onPress={sendMessage}
            style={{
              width: 46,
              height: 46,
              borderRadius: 15,
              backgroundColor: theme.accent,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="send" size={19} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
