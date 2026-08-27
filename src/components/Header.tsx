import { BlurView } from "expo-blur";
import type { IHeaderProps } from "../interfaces/props/IHeaderProps";
import { StyleSheet } from "react-native"

export function Header({ children, style, ...props }: IHeaderProps) {
    return (
        <BlurView intensity={50} tint="systemMaterialDark"
            style={[styles.header, style]} {...props}>
            {children}
        </BlurView>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        width: "auto",
        height: "auto",
        top: 50,
        left: 20,
        right: 20,
        zIndex: 10,
        elevation: 10,
        backgroundColor: 'transparent',
        overflow: "hidden"
    }
});