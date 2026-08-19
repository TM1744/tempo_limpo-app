import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ISafeViewProps } from '../interfaces/props/ISafeViewProps';

export function SafeView({ children, style, contentContainerStyle, ...props }: ISafeViewProps) {
    return (
        <ScrollView
            style={[styles.container, style]}
            contentContainerStyle={[styles.content, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            {...props}
        >
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "black"
    },
    content: {
        flexGrow: 1, // Garante que o conteúdo ocupe a tela toda mesmo quando houver poucos itens
        paddingTop: 55,
        paddingBottom: 55,
    },
});