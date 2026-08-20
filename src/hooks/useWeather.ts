import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { LocationService } from "../services/LocationService";
import { ChronoUnit, LocalDateTime } from "@js-joda/core";
import { WeatherService } from "../services/WeatherService";
import { Weather } from "../classes/Weather";
import { Location } from "../classes/Location";
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
        navigation.navigate("Hours", { day: day });
    }
    
    const fetchWeather = useCallback(async (targetLocation: Location) => {
        setLoading(true);
        setError(undefined);
        setWeather(undefined);

        const currentWeather = await WeatherService.searchWeather(targetLocation.lat, targetLocation.lon);

        if (currentWeather.isOk) {
            await WeatherService.saveWeather(currentWeather.value);
            setWeather(currentWeather.value);
        } else {
            setError(currentWeather.error);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        const initWeather = async () => {
            setLoading(true);
            setError(undefined);

            const savedLocation = await LocationService.getSavedLocation();
            if (savedLocation.isOk) setLocation(savedLocation.value);
            else { navigation.navigate('Locations'); return; };

            const savedWeather = await WeatherService.getSavedWeather();
            if (savedWeather.isOk) {
                const now = LocalDateTime.now();
                const hours = savedWeather.value.lastUpdate.until(now, ChronoUnit.HOURS);

                if (hours >= 3) await fetchWeather(savedLocation.value);
                else setWeather(savedWeather.value);
            }
            else await fetchWeather(savedLocation.value);

            setLoading(false);
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