import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { IFooterProps } from "../interfaces/props/IFooterProps";
import { StyleSheet, View } from "react-native";

export function Footer({ children, style, ...props }: IFooterProps) {
    const insets = useSafeAreaInsets();
    
    return (
        <View style={[{bottom: insets.bottom + 20}, styles.footer, style]} {...props} >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        right: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 10,
        elevation: 10,
    },
});