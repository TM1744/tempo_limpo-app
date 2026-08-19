import type { LocalDateTime } from "@js-joda/core";

export class Hour {
    time: LocalDateTime;
    temperature: number;
    rainChance: number;
    rainMM: number;
    id: number;

    constructor(time: LocalDateTime, temperature: number, rainChance: number, rainMM: number, id: number) {
        this.time = time;
        this.temperature = temperature;
        this.rainChance = rainChance;
        this.rainMM = rainMM;
        this.id = id;
    }
}