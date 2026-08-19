import { Day } from "../../classes/Day";

export interface IDayListProps {
    days?: Day[] | undefined;
    error?: string | undefined;
    loading?: boolean | undefined;
    onPress?(day: Day) : void;
}