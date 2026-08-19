import { Location } from "../../classes/Location";

export interface ILocationListProps {
    locations?: Location[];
    error?: string | undefined;
    loading?: boolean | undefined;
    onPress?(location: Location) : void;
}