import { StyleSheet, Text, View } from "react-native";
import { ITitleProps } from "../interfaces/props/ITitleProps";
import { FadeView } from "./FadeView";

export function Title({ text }: ITitleProps) {
    const formatedText = text ? text.toUpperCase() : "INDEFINIDO";

    return (
        <FadeView style={style.container} visible={true}>
            <Text style={style.text}>{formatedText}</Text>
        </FadeView>
    );
}

const style = StyleSheet.create({
    container: {
        width: "auto",
        height: "auto",
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        display: "flex",
        width: "auto",
        height: "auto",
        color: "white",
        fontSize: 24,
        fontFamily: "JosefinSans",
    }
});