
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ISearchBarProps } from '../interfaces/props/ISearchBarProps';
import { Press } from './Press';


export function SearchBar({ isLoading, search }: ISearchBarProps) {
    const [input, setInput] = useState<string>('');

    function handleSearch() {
        if (!input.trim() || isLoading) return;
        search(input);
        setInput('');
    }

    return (
        <View style={style.container}>
            <TextInput
                style={style.inputField}
                value={input}
                onChangeText={setInput}
                placeholder="Buscar localidade..."
                placeholderTextColor="#A0A5BD"
                editable={!isLoading}
                maxLength={50}
                returnKeyType="search"
                onSubmitEditing={handleSearch} // Permite buscar ao apertar "Enter/Ir" no teclado
            />

            <Press iconName={"search"} onPress={handleSearch} loading={isLoading}/>
        </View>


    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: wp(100),
        height: hp(6.5),
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