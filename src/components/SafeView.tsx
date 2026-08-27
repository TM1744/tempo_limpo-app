import React from 'react';
import { StyleSheet } from 'react-native';
import { ISafeViewProps } from '../interfaces/props/ISafeViewProps';
import { SafeAreaView } from 'react-native-safe-area-context';

export function SafeView({ children, style, ...props }: ISafeViewProps) {
return (
        <SafeAreaView style={[styles.container, style]} {...props}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "black",
        paddingHorizontal: 20
    },
});