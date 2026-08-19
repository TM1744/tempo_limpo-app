import { Day } from "../../classes/Day";

export interface IDayCardProps {
    day?: Day | undefined;
    onPress?(day: Day) : void;
}