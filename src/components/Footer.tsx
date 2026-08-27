import type { IFooterProps } from "../interfaces/props/IFooterProps";
import { StyleSheet, View } from "react-native";

export function Footer({ children, style, ...props }: IFooterProps) {
    return (
        <View style={[styles.footer, style]} {...props} >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        left: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 10,
        elevation: 10,
    },
});