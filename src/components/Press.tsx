import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { IPressProps } from "../interfaces/props/IPressProps";
import { FadeView } from "./FadeView";


export function Press<Args extends any[] = any[], Result = void>({
    onPress,
    iconName = "exclamation",
    loading = false
}: IPressProps<Args, Result>) {
    const isDisabled = loading || !onPress;

    const handlePress = () => {
        if (onPress) onPress(...([] as unknown as Args));
    };


    return (
        <FadeView visible>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[style.button, isDisabled && style.disabled]}
                onPress={handlePress}
                disabled={isDisabled}
            >
                {isDisabled ?
                    <ActivityIndicator size={24} color="white" />
                    :
                    <EvilIcons name={iconName} size={30} color="white" />
                }
            </TouchableOpacity>
        </FadeView>
    );
}


const style = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        height: 60,
        width: 60,
        borderRadius: 15,
        backgroundColor: "#008BA8",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5
    },

    disabled: {
        opacity: 0.6,
        shadowOpacity: 0.1,
        transform: [{ scale: 0.98 }]
    }
});
