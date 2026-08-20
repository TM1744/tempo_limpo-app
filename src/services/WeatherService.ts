import AsyncStorage from "@react-native-async-storage/async-storage";
import { OpenMeteoApi } from "../axios/OpenMeteoApi";
import { Day } from "../classes/Day";
import { Hour } from "../classes/Hour";
import { Weather } from "../classes/Weather";
import { LocalDate, LocalDateTime } from "@js-joda/core";
import { IParsedHour } from "../interfaces/parse/IParsedHour";
import { IParsedDay } from "../interfaces/parse/IParsedDay";
import { IParsedWeather } from "../interfaces/parse/IParsedWeather";

export class WeatherService {
    private constructor() { }

    static async getWeather(latitude: number, longitude: number): Promise<Weather | undefined> {
        console.info("WeatherService.getWeather called");

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        await delay(3000);

        const result = await OpenMeteoApi.fetchWeather(latitude, longitude);

        if (!result) return undefined;

        const hourly = result.hourly;
        const daily = result.daily;

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

        return new Weather(dayList, LocalDateTime.now());
    }

    static async saveWeather(weather: Weather): Promise<void> {
        console.info("WeatherService.saveWeather called");

        try {
            const jsonValue = JSON.stringify(weather);
            await AsyncStorage.setItem('current-weather', jsonValue);
        } catch (error) {
            console.log("Falha ao salvar previsão de tempo: " + error);
        }
    }

    static async removeSavedWeather(): Promise<void> {
        console.info("WeatherService.removeSavedWeather called");

        try {
            await AsyncStorage.removeItem('current-weather');
        } catch (error) {
            console.error("Falha ao excluir localidade salva: " + error);
        }
    }

    static async getSavedWeather(): Promise<Weather | undefined> {
        console.info("WeatherService.getSavedWeather called");

        try {
            const json = await AsyncStorage.getItem('current-weather');

            if (!json) return undefined;

            return this.weatherInterfaceToClass(JSON.parse(json) as IParsedWeather);
        } catch (error) {
            console.log("Falha ao buscar previsão do tempo salva: " + error)
            throw new Error("Falha ao buscar previsão do tempo salva: " + error);
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