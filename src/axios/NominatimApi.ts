import axios, { type AxiosInstance } from 'axios';
import { err, ok, Result } from '../types/Result';
import { ErrorInstanceToString } from '../utils/ErrorInstanceToString';
import { UserAgentService } from '../services/UserAgentService';

export interface INominatimAddress {
    road?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
}

export interface INominatimResult {
    name: string;
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon?: string;
    address?: INominatimAddress;
}

export class NominatimApi {
    private constructor() { }

    static async fetchLocations(query: string): Promise<Result<INominatimResult[], string>> {
        console.info("NominatimApi.fetchLocations called")

        try {
            const userAgent = await UserAgentService.getSavedUserAgent();
            if (!userAgent.isOk) return err(userAgent.error);

            const axiosInstance = axios.create({
                baseURL: 'https://nominatim.openstreetmap.org',
                headers: {
                    'User-Agent': `Tempo_Limpo/v1 ${userAgent}`,
                },
                timeout: 5000
            });

            const response = await axiosInstance.get<INominatimResult[]>('/search', {
                params: {
                    q: query,
                    format: 'json',
                    addressdetails: 1,
                    limit: 3,
                },
            });

            if (!response) {
                console.error("NominatimApi.fetchLocations => the response to the Nominatim API request is undefined")
                return err("A resposta do serviço de localização é indefinida.");
            }

            return ok(response.data);

        } catch (error: unknown) {
            let errorMessage = "Falha ao buscar localidades.";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error(`NominatimApi.fetchLocations => [${error.response.status}]: ${error.response.data?.message || 'unknown'}`);
                    errorMessage = `Erro no serviço de localização.`;
                } else if (error.request) {
                    console.error(`NominatimApi.fetchLocations => no response`);
                    errorMessage = "Sem resposta do serviço de localização. Verifique a sua conexão com a internet.";
                } else {
                    console.error(`NominatimApi.fetchLocations => query configuration failure: ${error.message}`);
                    errorMessage = `Falha de configuração de consulta do serviço de localização.`;
                }
            } else {
                console.error(`NominatimApi.fetchLocations => unknown error: ${ErrorInstanceToString(error)}`);
                errorMessage = `Erro não identificado do serviço de localização.`;
            }

            return err(errorMessage);
        }
    }
}