import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { StyleSheet } from "react-native";
import { LocationCard } from "../components/LocationCard";
import { useWeather } from "../hooks/useWeather";
import { DayList } from "../components/DayList";
import { Press } from "../components/Press";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";

export function WeatherScreen() {
    const { location, weather, loading, error, removeAndReturn, navigateToHours, fetchWeather } = useWeather();

    return (
        <SafeView>
            <Header>
                <Title text="Previsão do tempo" />
            </Header>

            <Main>
                <LocationCard location={location} onPress={removeAndReturn} />

                <DayList
                    days={weather?.days}
                    error={error}
                    loading={loading}
                    onPress={navigateToHours}
                />
            </Main>

            <Footer style={style.footer}>
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
            </Footer>
        </SafeView>
    );
}

const style = StyleSheet.create({
    footer: {
        gap: 20
    }
});