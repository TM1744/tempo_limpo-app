import AsyncStorage from "@react-native-async-storage/async-storage";
import { OpenMeteoApi } from "../axios/OpenMeteoApi";
import { Day } from "../classes/Day";
import { Hour } from "../classes/Hour";
import { Weather } from "../classes/Weather";
import { LocalDate, LocalDateTime } from "@js-joda/core";
import { IParsedHour } from "../interfaces/parse/IParsedHour";
import { IParsedDay } from "../interfaces/parse/IParsedDay";
import { IParsedWeather } from "../interfaces/parse/IParsedWeather";
import { err, ok, Result } from "../types/Result";

export class WeatherService {
    private constructor() { }

    static async searchWeather(latitude: number, longitude: number): Promise<Result<Weather, string>> {
        console.info("WeatherService.searchWeather called");

        try {
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            await delay(1500);

            const results = await OpenMeteoApi.fetchWeather(latitude, longitude);

            if (!results.isOk) return err(results.error);

            const hourly = results.value.hourly;
            const daily = results.value.daily;

            let hourList: Hour[] = [];
            let dayList: Day[] = [];


            for (let i = 0; i < hourly.time.length; i++) {
                hourList.push(new Hour(
                    LocalDateTime.parse(hourly.time[i]),
                    hourly.temperature_2m[i],
                    hourly.precipitation_probability[i],
                    hourly.precipitation[i],
                    i
                ));
            };

            for (let i = 0; i < daily.time.length; i++) {
                let dayHourList = hourList.splice(0, 24);

                dayList.push(new Day(
                    LocalDate.parse(daily.time[i]),
                    dayHourList,
                    daily.precipitation_probability_mean[i],
                    daily.temperature_2m_mean[i],
                    i
                ));
            };

            const weather = new Weather(dayList, LocalDateTime.now());

            return ok(weather);

        } catch {
            console.error(`WeatherService.searchWeather => failure in the general processing of locations`);
            return err(`Falha no processamento geral da previsão de tempo.`);
        }

    }

    static async saveWeather(weather: Weather): Promise<void> {
        console.info("WeatherService.saveWeather called");

        try {
            const jsonValue = JSON.stringify(weather);
            
            if (!jsonValue) console.error(`WeatherService.saveWeater => failed to convert object to JSON`);

            await AsyncStorage.setItem('current-weather', jsonValue);
        } catch {
            console.error(`WeatherService.saveWeather => failed to save weather`);
        }
    }

    static async removeSavedWeather(): Promise<void> {
        console.info("WeatherService.removeSavedWeather called");

        try {
            await AsyncStorage.removeItem('current-weather');
        } catch (error) {
            console.error(`WeatherService.removeSavedWeather => failed to remove saved weather`);
        }
    }

    static async getSavedWeather(): Promise<Result<Weather, string>> {
        console.info("WeatherService.getSavedWeather called");

        try {
            const json = await AsyncStorage.getItem('current-weather');

            if (!json) {
                console.warn(`WeatherService.getSavedWeather => failed to fetch JSON`);
                return err(`Falha ao recuperar previsão de tempo salva.`);
            }

            const weather = this.weatherInterfaceToClass(JSON.parse(json) as IParsedWeather);

            if (!weather) {
                console.warn(`WeatherService.getSavedWeather => failed to convert JSON to interface, and interface to object`);
                return err(`Falha ao converter previsão de tempo.`)
            }

            return ok(weather);

        } catch {
            console.warn(`WeatherService.getSavedWeather => failed to retrieve saved weather`)
            return err(`Falha ao recuperar a previsão do tempo salva.`)
        }
    }

    private static hourInterfaceToClass(hourInterface: IParsedHour): Hour {
        return new Hour(
            LocalDateTime.parse(hourInterface.time),
            hourInterface.temperature,
            hourInterface.rainChance,
            hourInterface.rainMM,
            hourInterface.id
        );
    }

    private static dayInterfaceToClass(dayInterface: IParsedDay): Day {
        const hours = dayInterface.hours.map((hour) =>
            this.hourInterfaceToClass(hour)
        );

        return new Day(
            LocalDate.parse(dayInterface.date),
            hours,
            dayInterface.rainChance,
            dayInterface.temperature,
            dayInterface.id
        );
    }

    private static weatherInterfaceToClass(weatherInterface: IParsedWeather): Weather {
        const days = weatherInterface.days.map((day) =>
            this.dayInterfaceToClass(day)
        );

        return new Weather(
            days,
            LocalDateTime.parse(weatherInterface.lastUpdate)
        );
    }
}