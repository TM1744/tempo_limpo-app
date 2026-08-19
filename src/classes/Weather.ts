import { LocalDateTime } from "@js-joda/core";
import type { Day } from "./Day";

export class Weather {
    days: Day[];
    isEmpty: boolean;
    lastUpdate: LocalDateTime;

    constructor (days: Day[], lastUpdate: LocalDateTime) {
        this.days = days
        this.isEmpty = days.length === 0 || !days
        this.lastUpdate = lastUpdate;
    }
}