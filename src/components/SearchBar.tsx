
import React, { useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ISearchBarProps } from '../interfaces/props/ISearchBarProps';
import { EvilIcons } from '@expo/vector-icons';


export function SearchBar({ isLoading, search }: ISearchBarProps) {
    const [input, setInput] = useState<string>('');

    function handleSearch() {
        if (!input.trim() || isLoading) return;
        search(input);
        setInput('');
        console.log("função do search bar chamada")
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

            <TouchableOpacity
                activeOpacity={0.7}
                style={style.searchButton}
                onPress={handleSearch}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size={40} color="white" />
                ) : (
                    <EvilIcons name="search" size={40} color={"white"}/>
                )}
            </TouchableOpacity>
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
        height: '100%',
        paddingLeft: 10,
        color: '#FFFFFF',
        fontSize: 18,
        paddingRight: 10,
        fontFamily: "Lato-Regular",
        borderWidth: 2,
        borderColor: "rgb(0, 118, 122)",
        borderRadius: 10

    },

    searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: '100%',
        width: 65,
        borderRadius: 10,
        backgroundColor: "rgb(0, 118, 122)"
    }
});