import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { LocationService } from "../services/LocationService";
import { Location } from "../classes/Location";

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

        const response = await LocationService.searchLocations(input);
        if(response.isOk) setLocations(response.value); 
        else setError(response.error);

        setLoading(false);
    }

    return {
        locations,
        loading,
        error,
        saveAndNavigate,
        fetchLocations
    }

}