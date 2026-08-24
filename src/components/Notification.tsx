import { StyleSheet, Text, View } from "react-native";
import { INotificationProps } from "../interfaces/props/INotificationProps";
import { EvilIcons } from "@expo/vector-icons";
import { FadeView } from "./FadeView";

export function Notification({ text }: INotificationProps) {

    return (
        <FadeView style={style.container} visible={true}>
            <View>
                <EvilIcons name="exclamation" size={40} color={"black"} />
            </View>
            <Text style={style.text}>{text ?? "Mensagem de notificação não definida!"}</Text>
        </FadeView>
    );
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        backgroundColor: "rgb(254, 254, 254)",
        borderRadius: 10,
        alignItems: "center",
        gap: 20,
        flexDirection: "row",
        padding: 20,
        paddingLeft: 25
    },

    text: {
        display: "flex",
        color: "black",
        flex: 1,
        fontFamily: "Lato-Regular",
        fontSize: 15,
        lineHeight: 22
    }
})