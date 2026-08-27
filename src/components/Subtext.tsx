import { Text, StyleSheet } from "react-native";
import type { ISubtextProps } from "../interfaces/props/ISubTextProps";

export function Subtext ({text, style, ...props} : ISubtextProps) {
    return (
        <Text style={[styles.text, style]} {...props}>
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
  text: {
    color: '#A0A5BD', // Tom cinza suave para subtexto
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Lato-Regular"
  }
});