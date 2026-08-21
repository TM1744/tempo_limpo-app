import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { View, StyleSheet } from "react-native";
import { LocationCard } from "../components/LocationCard";
import { useWeather } from "../hooks/useWeather";
import { DayList } from "../components/DayList";
import { Press } from "../components/Press";

export function WeatherScreen() {
    const { location, weather, loading, error, removeAndReturn, navigateToHours, fetchWeather } = useWeather();

    return (
        <SafeView>
            <View style={style.container}>
                <Title text="Previsão" />
                <LocationCard location={location} onPress={removeAndReturn} />

                <Press loading={loading} iconName="refresh" onPress={() => fetchWeather(location)}/>

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
    }
});