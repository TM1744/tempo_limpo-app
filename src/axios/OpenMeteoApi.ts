import type { AxiosInstance } from "axios";
import axios from "axios";
import { err, ok, Result } from "../types/Result";
import { ErrorInstanceToString } from "../utils/ErrorInstanceToString";

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

    static async fetchWeather(latitude: number, longitude: number): Promise<Result<IOpenMeteoResult, string>> {
        console.info("OpenMeteoApi.fetchWeather called");

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

            if(!response) {
                console.error("OpenMeteoApi.fetchWeather => the response to the OpenMeteo API request is undefined")
                return err("A resposta do serviço de clima é indefinida.");                
            };

            return ok(response.data);

        } catch (error: unknown) {
            let errorMessage = "Falha ao buscar previsão do tempo";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error(`OpenMeteoApi.fetchWeather => [${error.response.status}]: ${error.response.data?.message || 'unknown'}`)
                    errorMessage = `Erro no serviço de clima.`;
                } else if (error.request) {
                    console.error(`OpenMeteoApi.fetchWeather => no response`);
                    errorMessage = "Sem resposta do serviço de clima. Verifique a sua conexão com a internet.";
                } else {
                    console.error(`OpenMeteoApi.fetchWeather => query configuration failure: ${error.message}`)
                    errorMessage = `Falha de configuração de consulta do serviço de clima.`;
                }
            } else {
                console.error(`OpenMeteoApi.fetchWeather => unknow error: ${ErrorInstanceToString(error)}`);
                errorMessage = `Erro não identificado do serviço de clima`;
            }

            return err(errorMessage);
        }
    }
}