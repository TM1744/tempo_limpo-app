import type { AxiosInstance } from "axios";
import axios from "axios";

interface IHourlyData {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
}

interface IDailyData {
    time: string[];
    temperature_2m_mean: number[];
    precipitation_probability_mean: number[];
}

interface IOpenMeteoResult {
    hourly: IHourlyData;
    daily: IDailyData;
}

export class OpenMeteoApi {
    private constructor() { }

    private static axiosInstance: AxiosInstance = axios.create({
        baseURL: 'https://api.open-meteo.com/v1'
    });

    static async fetchWeather(latitude: number, longitude: number): Promise<IOpenMeteoResult> {
        try {
            const response = await this.axiosInstance.get<IOpenMeteoResult>('/forecast', {
                params: {
                    latitude,
                    longitude,
                    daily: ["temperature_2m_mean", "precipitation_probability_mean"].join(','),
                    hourly: ["temperature_2m", "precipitation_probability", "precipitation"].join(','),
                    timezone: "America/Sao_Paulo",
                    forecast_days: 3
                }
            });

            return response.data;
        } catch (error: unknown) {
            let errorMessage = "Falha ao buscar previsão do tempo";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMessage = `Erro no serviço de clima [${error.response.status}]: Coordenadas ou parâmetros inválidos.`;
                } else if (error.request) {
                    errorMessage = "Sem resposta do serviço de clima. O serviço pode estar indisponível no momento.";
                } else {
                    errorMessage = `Erro ao configurar consulta do clima: ${error.message}`;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            console.error(errorMessage, error);
            throw new Error(errorMessage);
        }
    }
}