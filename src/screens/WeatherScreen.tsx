import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { View, StyleSheet, ScrollView } from "react-native";
import { LocationCard } from "../components/LocationCard";
import { useWeather } from "../hooks/useWeather";
import { DayList } from "../components/DayList";
import { Press } from "../components/Press";

export function WeatherScreen() {
    const { location, weather, loading, error, removeAndReturn, navigateToHours, fetchWeather } = useWeather();

    return (
        <SafeView style={style.container}>
            <View style={style.header}>
                <Title text="Previsão do tempo" />
            </View>

            <ScrollView style={style.main}
                contentContainerStyle={style.mainContent}>
                <LocationCard location={location} onPress={removeAndReturn} />

                <DayList
                    days={weather?.days}
                    error={error}
                    loading={loading}
                    onPress={navigateToHours}
                />
            </ScrollView>

            <View style={style.footer}>
                <Press
                    loading={loading}
                    iconName="refresh"
                    onPress={() => fetchWeather(location)}
                />

                {!loading &&
                    <Press
                        loading={loading}
                        iconName="gear"
                        onPress={() => console.log()}
                    />
                }
            </View>

        </SafeView>
    );
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },

    header: {
        width: "auto",
        height: "auto",
        paddingBottom: 20
    },

    main: {
        flex: 1,
        width: "100%",
        height: "auto"
    },

    mainContent: {
        flexGrow: 1,
        justifyContent: "flex-start",
        gap: 30
    },

    footer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        paddingTop: 20,
        height: "auto",
        justifyContent: "flex-end",
        gap: 20
    }
});