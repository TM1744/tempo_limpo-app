
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { IInputFieldProps } from '../interfaces/props/IInputFieldProps';
import { Press } from './Press';
import { FadeView } from './FadeView';


export function InputField({ loading = false, onPressButton, buttonIconName }: IInputFieldProps) {
    const [input, setInput] = useState<string>('');

    function handleSearch() {
        if (!input.trim() || loading || !onPressButton) return;
        onPressButton(input);
        setInput('');
    }

    return (
        <FadeView style={style.container} visible={true}>
            <TextInput
                style={style.inputField}
                value={input}
                onChangeText={setInput}
                placeholder="Buscar localidade..."
                placeholderTextColor="#A0A5BD"
                editable={!loading}
                maxLength={50}
                returnKeyType="search"
                onSubmitEditing={handleSearch} // Permite buscar ao apertar "Enter/Ir" no teclado
            />

            <Press iconName={buttonIconName} onPress={handleSearch} loading={loading} />
        </FadeView>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        height: "auto",
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 15
    },

    inputField: {
        flex: 1, // Preenche todo o espaço disponível entre o início e o botão
        height: 64.5,
        paddingLeft: 10,
        color: '#FFFFFF',
        fontSize: 18,
        paddingRight: 10,
        fontFamily: "Lato-Regular",
        borderWidth: 1.5,
        borderColor: "rgb(0, 118, 122)",
        borderRadius: 10

    }
});