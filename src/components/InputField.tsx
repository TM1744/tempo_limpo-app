
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { IInputFieldProps } from '../interfaces/props/IInputFieldProps';
import { Press } from './Press';
import { FadeView } from './FadeView';


export function InputField({ loading = false, onPressButton, buttonIconName, placeHolder }: IInputFieldProps) {
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
                placeholder={placeHolder ? placeHolder : "..."}
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
        display: "flex",
        flexDirection: 'row',
        width: "100%",
        height: "auto",
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "#008BA8",
        borderRadius: 15,
        paddingRight: 10
    },

    inputField: {
        flex: 1,
        paddingHorizontal: 20,
        height: 70,
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: "Lato-Regular"
    }
});