import { Day } from "../classes/Day";
import { Location } from "../classes/Location";

export type StackType = {
    Locations: undefined;
    Weather: undefined;
    Hours: { day: Day | undefined; };
    UserAgent: undefined;
    Info: undefined;
}