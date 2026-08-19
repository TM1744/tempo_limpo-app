import axios, { type AxiosInstance } from 'axios';

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

    private static axiosInstance: AxiosInstance = axios.create({
        baseURL: 'https://nominatim.openstreetmap.org',
        headers: {
            'User-Agent': 'Tempo_Limpo/v0.1 (marquesthiago1744@gmail.com)',
        },
        timeout: 5000
    });

    static async fetchLocations(query: string): Promise<INominatimResult[]> {
        try {
            const response = await this.axiosInstance.get<INominatimResult[]>('/search', {
                params: {
                    q: query,
                    format: 'json',
                    addressdetails: 1,
                    limit: 3,
                },
            });

            return response.data;
        } catch (error: unknown) {
            let errorMessage = "Falha ao buscar localidades";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMessage = `Erro no serviço de localização [${error.response.status}]: ${error.response.data?.message || error.message}`;
                } else if (error.request) {
                    errorMessage = "Sem resposta do serviço de localização. Verifique a sua conexão com a internet.";
                } else {
                    errorMessage = `Erro ao configurar consulta de localização: ${error.message}`;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            console.error(errorMessage, error);
            throw new Error(errorMessage);
        }
    }
}