import type { IMainProps } from "../interfaces/props/IMainProps";
import { ScrollView, StyleSheet } from "react-native";

export function Main({ children, style, contentContainerStyle, ...props }: IMainProps) {
    return (
        <ScrollView style={[styles.main, style]}
            contentContainerStyle={[styles.mainContent, contentContainerStyle]}
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
    },

    mainContent: {
        paddingTop: 60,
        paddingBottom: 90,
        gap: 30,
    }
});