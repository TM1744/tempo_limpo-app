import { IParsedDay } from "./IParsedDay";

export interface IParsedWeather {
    days: IParsedDay[];
    isEmpty: boolean;
    lastUpdate: string;
}