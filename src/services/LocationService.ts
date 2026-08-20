import { NominatimApi } from "../axios/NominatimApi";
import { Location } from "../classes/Location"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IParsedLocation } from "../interfaces/parse/IParsedLocation";

export class LocationService {
    private constructor() { }

    static async searchLocations(query: string): Promise<Location[] | undefined> {
        console.info("LocationService.searchLocations called");

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        await delay(3000)

        const cleanQuery = query
            .replace(/[^a-zA-Z0-9\s\u00C0-\u024F]/g, '')
            .replace(/\s+/g, '_')
            .toLowerCase();

        const results = await NominatimApi.fetchLocations(cleanQuery);

        if (!results) return undefined;

        const locations = results.map((item, index) => new Location(
            item.name,
            item.display_name,
            parseFloat(item.lat),
            parseFloat(item.lon),
            index
        ));

        return locations;
    }

    static async saveLocation(location: Location): Promise<void> {
        console.info("LocationService.saveLocation called");

        try {
            const jsonValue = JSON.stringify(location);
            await AsyncStorage.setItem('selected-location', jsonValue);
        } catch (error) {
            console.log("Falha ao salvar localidade: " + error);
        }
    }

    static async getSavedLocation(): Promise<Location | undefined> {
        console.info("LocationService.getSavedLocation called");

        try {
            const json = await AsyncStorage.getItem('selected-location');

            if (!json) return undefined;
            
            return this.interfaceToClass(JSON.parse(json) as IParsedLocation);

        } catch (error) {
            console.error("Falha ao buscar localidade:", error);
            return undefined;
        }
    }

    static async removeSavedLocation(): Promise<void> {
        console.info("LocationService.removeSavedLocation called");

        try {
            await AsyncStorage.removeItem('selected-location');
        } catch (error) {
            console.error("Falha ao excluir localidade salva: " + error);
        }
    }

    private static interfaceToClass(locationInterface: IParsedLocation): Location {
        return new Location(locationInterface.name, locationInterface.references, locationInterface.lat,
            locationInterface.lon, locationInterface.id
        );
    }
}