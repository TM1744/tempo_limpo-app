import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { LocationService } from "../services/LocationService";
import { Location } from "../classes/Location";
import { ErrorInstanceToString } from "../utils/ErrorInstanceToString";

export function useLocation() {
    const [locations, setLocations] = useState<Location[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const navigation = useNavigation();

    async function saveAndNavigate(location: Location) {
        await LocationService.saveLocation(location);
        navigation.navigate("Weather");
    }

    async function fetchLocations(input: string): Promise<void> {
        setError(undefined);
        setLocations(undefined);
        setLoading(true);
        try {
            const response = await LocationService.searchLocations(input);
            setLocations(response);
        } catch (error) {
            setError(ErrorInstanceToString(error))
            setLocations(undefined);
        } finally {
            setLoading(false);
        }
    }

    return {
        locations,
        loading,
        error,
        saveAndNavigate,
        fetchLocations
    }

}