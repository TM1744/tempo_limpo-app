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
            {isDisabled ? 
                <ActivityIndicator size={40} color="white" />
                :
                <EvilIcons name={iconName} size={40} color="white" />
            }
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 65,
    width: 65,
    borderRadius: 10,
    backgroundColor: "rgb(0, 118, 122)"
  },

  disabled: {
    opacity: 0.6
  }
});