import { BlurView } from "expo-blur";
import type { IHeaderProps } from "../interfaces/props/IHeaderProps";
import { StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header({ children, style, ...props }: IHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <BlurView intensity={30} tint="systemMaterialDark"
            style={[{paddingTop: insets.top + 20},styles.header, style]} {...props}>
            {children}
        </BlurView>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        height: "auto",
        left: 20,
        right: 20,
        zIndex: 10,
        elevation: 10,
        backgroundColor: 'transparent',
        overflow: "hidden"
    }
});