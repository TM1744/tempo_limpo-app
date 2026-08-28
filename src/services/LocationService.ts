import { NominatimApi } from "../axios/NominatimApi";
import { Location } from "../classes/Location"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IParsedLocation } from "../interfaces/parse/IParsedLocation";
import { err, ok, Result } from "../types/Result";
import { ErrorInstanceToString } from "../utils/ErrorInstanceToString";

export class LocationService {
    private constructor() { }

    static async searchLocations(query: string): Promise<Result<Location[], string>> {
        console.info("LocationService.searchLocations called");

        try {
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            await delay(1500)

            const cleanQuery = query
                .replace(/[^a-zA-Z0-9\s\u00C0-\u024F]/g, '')
                .replace(/\s+/g, '_')
                .toLowerCase();

            const results = await NominatimApi.fetchLocations(cleanQuery);

            if (!results.isOk) return err(results.error)

            const locations = results.value.map((item, index) => new Location(
                item.name,
                item.display_name,
                parseFloat(item.lat),
                parseFloat(item.lon),
                index
            ));

            if (!locations || locations.length === 0) {
                console.error("LocationService.searchLocations => interface-to-class conversion failure");
                return err("Falha de conversão de interface para classe");
            }

            return ok(locations);
        } catch {
            console.error(`LocationService.searchLocations => failure in the general processing of locations`);
            return err("Falha no processamento geral das localizações.");
        }

    }

    static async saveLocation(location: Location): Promise<void> {
        console.info("LocationService.saveLocation called");

        try {
            const jsonValue = JSON.stringify(location);

            if (!jsonValue) console.error(`LocationService.saveLocation => failed to convert object to JSON`);

            await AsyncStorage.setItem('selected-location', jsonValue);
        } catch {
            console.error(`LocationService.saveLocation => failed to save location`);
        }
    }

    static async getSavedLocation(): Promise<Result<Location, string>> {
        console.info("LocationService.getSavedLocation called");

        try {
            const json = await AsyncStorage.getItem('selected-location');

            if (!json) {
                console.warn(`LocationService.getSavedLocation => failed to fetch JSON`);
                return err(`Falha ao recuperar localização salva.`);
            }

            const location = this.interfaceToClass(JSON.parse(json) as IParsedLocation);

            if (!location) {
                console.warn(`LocationService.getSavedLocation => failed to convert JSON to interface, and interface to object`);
                return err(`Falha ao converter localização salva.`)
            }

            return ok(location);

        } catch {
            console.warn(`LocationService.getSavedLocation => failed to retrieve saved location`);
            return err(`Falha ao recuperar localização salva.`);
        }
    }

    static async removeSavedLocation(): Promise<void> {
        console.info("LocationService.removeSavedLocation called");

        try {
            await AsyncStorage.removeItem('selected-location');
        } catch {
            console.error(`LocationService.saveLocation => failed to remove saved location`);
        }
    }

    private static interfaceToClass(locationInterface: IParsedLocation): Location {
        return new Location(locationInterface.name, locationInterface.references, locationInterface.lat,
            locationInterface.lon, locationInterface.id
        );
    }
}