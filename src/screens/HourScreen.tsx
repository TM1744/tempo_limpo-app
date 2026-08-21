import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackType } from "../types/StackType";
import { SafeView } from "../components/SafeView";
import { View, StyleSheet } from "react-native";
import { Title } from "../components/Title";
import { HourList } from "../components/HourList";
import { Press } from "../components/Press";

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
                <Press onPress={() => navigation.navigate("Weather")}
                    iconName="arrow-left" />
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
    }
});