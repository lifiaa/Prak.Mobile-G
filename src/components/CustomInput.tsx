
import { forwardRef } from "react";
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
} from "react-native";

const CustomInput = forwardRef<TextInput, TextInputProps>(
  (props, ref) => {
    return (
      <TextInput
        ref={ref}
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor="#718090"
      />
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2E8",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontSize: 16,
    color: "#13293D",
    minHeight: 55,
  },
});
