import { IParsedHour } from "./IParsedHour";

export interface IParsedDay {
    date: string;
    hours: IParsedHour[];
    hoursIsEmpty: boolean;
    rainChance: number;
    rainMM: number;
    temperature: number;
    dayOfWeek: string;
    dayName: string;
    id: number;
}