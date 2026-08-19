import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LocationCard } from "../components/LocationCard";
import { useWeather } from "../hooks/useWeather";
import { DayList } from "../components/DayList";
import { EvilIcons } from "@expo/vector-icons";

export function WeatherScreen() {
    const { location, weather, loading, error, removeAndReturn, navigateToHours, fetchWeather } = useWeather();

    return (
        <SafeView>
            <View style={style.container}>
                <Title text="Previsão" />
                <LocationCard location={location} onPress={removeAndReturn} />
                {!loading && location &&
                    <TouchableOpacity activeOpacity={0.7} style={style.button}
                        onPress={() => fetchWeather(location)}
                        disabled={loading}>
                        <EvilIcons name="refresh" size={40} color={"white"} />
                    </TouchableOpacity>
                }
                <DayList
                    days={weather?.days}
                    error={error}
                    loading={loading}
                    onPress={navigateToHours}
                />
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

    listContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15
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