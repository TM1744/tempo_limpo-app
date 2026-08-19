import { ChronoUnit, DateTimeFormatter, DayOfWeek, LocalDate } from "@js-joda/core";
import type { Hour } from "./Hour";

export class Day {
    date: LocalDate;
    hours: Hour[];
    hourIsEmpty: boolean;
    rainChance: number;
    rainMM: number;
    temperature: number;
    dayOfWeek: DayOfWeek;
    dayName: string;
    id: number;

    constructor(
        date: LocalDate,
        hours: Hour[],
        rainChance: number,
        temperature: number,
        id: number
    ) {
        this.date = date;
        this.hours = hours;
        this.hourIsEmpty = hours.length === 0 || !hours;
        this.rainChance = rainChance;
        this.rainMM = this.calculateRainMM();
        this.temperature = temperature;
        this.dayOfWeek = date.dayOfWeek();
        this.dayName = this.defineDayName();
        this.id = id;
    }

    private calculateRainMM(): number {
        let total = 0;

        this.hours.forEach((hour) => {
            total = total + hour.rainMM;
        });

        return total;
    }

    private defineDayName(): string {
        switch (this.dayOfWeek) {
            case DayOfWeek.MONDAY: return "Segunda";
            case DayOfWeek.TUESDAY: return "Terça";
            case DayOfWeek.WEDNESDAY: return "Quarta";
            case DayOfWeek.THURSDAY: return "Quinta";
            case DayOfWeek.FRIDAY: return "Sexta";
            case DayOfWeek.SATURDAY: return "Sábado";
            case DayOfWeek.SUNDAY: return "Domingo";
            default: return "Indefinido";
        }
    }

    public defineLabel(): string {
        const today = LocalDate.now();
        const days = today.until(this.date, ChronoUnit.DAYS);
        const formatter = DateTimeFormatter.ofPattern("dd/MM");

        switch (days) {
            case 0: return "Hoje";
            case 1 : return "Amanhã";
            case 2: return this.dayName;
            case 3: return this.dayName;
            case 4: return this.dayName;
            case 5: return this.dayName;
            case 6: return this.dayName;
            default: return formatter.format(this.date);
        }
    }
}