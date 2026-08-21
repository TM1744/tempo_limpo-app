import { StyleSheet, Text, View } from "react-native";
import { ITitleProps } from "../interfaces/props/ITitleProps";
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
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
        width: wp(100),
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        color: "white",
        fontSize: 24,
        fontFamily: "JosefinSans",

    }
});