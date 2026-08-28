import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { IMainProps } from "../interfaces/props/IMainProps";
import { ScrollView, StyleSheet } from "react-native";

export function Main({ children, style, contentContainerStyle, ...props }: IMainProps) {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={[styles.main, style]}
            contentContainerStyle={[{ }, styles.mainContent, contentContainerStyle]}
            {...props}
        >
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: "100%",
        overflow: "hidden"
    },

    mainContent: {
        paddingTop: 90,
        paddingBottom: 90,
        gap: 30,
    }
});