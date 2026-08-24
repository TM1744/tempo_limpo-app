import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { IPressProps } from "../interfaces/props/IPressProps";


export function Press<Args extends any[] = any[], Result = void>({
    onPress, 
    iconName = "exclamation", 
    loading = false
}: IPressProps<Args, Result>) {
    const isDisabled = loading || !onPress;

    const handlePress = () => {
        if (onPress) onPress(...([] as unknown as Args));
    };


    return (
        <TouchableOpacity 
            activeOpacity={0.8} 
            style={[style.button, isDisabled && style.disabled]} 
            onPress={handlePress}
            disabled={isDisabled}
        >
            {/* Ajustei o tamanho do ActivityIndicator para ser proporcional */}
            {isDisabled ? 
                <ActivityIndicator size={24} color="white" />
            :
                <EvilIcons name={iconName} size={30} color="white" /> // Reduzi um pouco o ícone para não parecer pesado
            }
        </TouchableOpacity>
    );
}


const style = StyleSheet.create({
    // --- Estilo Base (O botão flutuante) ---
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8, // Melhor usar padding vertical/horizontal se for crescer
        height: 60,         // Diminuir levemente a altura para ser mais compacto
        width: 60,          // Diminuir ligeiramente a largura
        borderRadius: 15,   // Curvas mais suaves (mais moderno)
        backgroundColor: "#008BA8", // Um tom de teal vibrante e profissional
        
        // Efeitos de Profundidade (Crucial para qualquer fundo)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Intensidade da sombra
        shadowRadius: 8,      // Raio da sombra (quão difusa ela é)
        elevation: 5          // Efeito de sombra no Android (obrigatório)
    },

    // --- Estilo Desativado ---
    disabled: {
        opacity: 0.6,
        // Diminuir ou remover a sombra quando desabilitado para parecer "achatado"
        shadowOpacity: 0.1, 
        transform: [{ scale: 0.98 }] // Adiciona um pequeno "efeito de aperto" sutil
    }
});
