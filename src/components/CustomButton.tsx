import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../styles";

type CustomButtonProps = TouchableOpacityProps & {
  title: string;
};

export default function CustomButton({
  title,
  ...props
}: CustomButtonProps) {
  const { darkMode } = useTheme();
  const theme = darkMode ? themeColors.dark : themeColors.light;

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { backgroundColor: theme.button },
        props.style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: theme.buttonText }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 60,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
  },
});