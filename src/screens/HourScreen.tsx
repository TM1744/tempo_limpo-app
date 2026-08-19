import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackType } from "../types/StackType";
import { SafeView } from "../components/SafeView";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Title } from "../components/Title";
import { HourList } from "../components/HourList";
import { EvilIcons } from "@expo/vector-icons";

type HoursRouteProp = RouteProp<StackType, 'Hours'>;

export function HourScreen() {
    const route = useRoute<HoursRouteProp>();
    const { day } = route.params || {};
    const navigation = useNavigation();


    const label = day ? "Previsão de " + day.defineLabel() : "Previsão";

    return (
        <SafeView>
            <View style={style.container}>
                <Title text={label} />
                <TouchableOpacity activeOpacity={0.7} style={style.button}
                    onPress={() => navigation.navigate("Weather")}>
                    <EvilIcons name="arrow-left" size={40} color={"white"} />
                </TouchableOpacity>
                <HourList hours={day?.hours} />
            </View>
        </SafeView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 30,
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 65,
        borderRadius: 10,
        backgroundColor: "rgb(0, 118, 122)"
    }
});