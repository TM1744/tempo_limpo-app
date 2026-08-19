import { Location } from "../../classes/Location";

export interface ILocationCardProps {
    location?: Location;
    onPress?(location: Location): void;
}
