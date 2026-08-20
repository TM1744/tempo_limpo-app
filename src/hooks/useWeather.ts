import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { LocationService } from "../services/LocationService";
import { ChronoUnit, LocalDateTime } from "@js-joda/core";
import { WeatherService } from "../services/WeatherService";
import { Weather } from "../classes/Weather";
import { Location } from "../classes/Location";
import { ErrorInstanceToString } from "../utils/ErrorInstanceToString";
import { Day } from "../classes/Day";

export function useWeather() {
    const navigation = useNavigation();

    const [location, setLocation] = useState<Location | undefined>(undefined);
    const [weather, setWeather] = useState<Weather | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    async function removeAndReturn() {
        await LocationService.removeSavedLocation();
        await WeatherService.removeSavedWeather();
        navigation.navigate('Locations');
    }

    function navigateToHours(day: Day) {
        navigation.navigate("Hours", {day : day});
    }

    async function fetchWeather(targetLocation: Location) {
        setError(undefined);
        setLoading(true);

        try {
            const currentWeather = await WeatherService.searchWeather(targetLocation.lat, targetLocation.lon);
            if (currentWeather) {
                await WeatherService.saveWeather(currentWeather);
                setWeather(currentWeather);
            }
        } catch (error) {
            setError(ErrorInstanceToString(error));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const initWeather = async () => {
            try {
                setLoading(true);
                setError(undefined);

                const savedLocation = await LocationService.getSavedLocation();
                if (savedLocation) setLocation(savedLocation); else return;

                const savedWeather = await WeatherService.getSavedWeather();
                if (savedWeather) {
                    const now = LocalDateTime.now();
                    const hours = savedWeather.lastUpdate.until(now, ChronoUnit.HOURS);

                    if (hours >= 3) await fetchWeather(savedLocation); else setWeather(savedWeather);
                } else {
                    await fetchWeather(savedLocation);
                }
            } catch (error) {
                setError(ErrorInstanceToString(error))
            } finally {
                setLoading(false);
            }
        }

        initWeather();

    }, [])

    return {
        location,
        weather,
        loading,
        error,
        removeAndReturn,
        fetchWeather,
        navigateToHours
    };
}