import { ILocationListProps } from "../interfaces/props/ILocationListProps";
import { LocationCard } from "./LocationCard";
import { Notification } from "./Notification";
import { StyleSheet, View } from "react-native";

export function LocationList({ error, loading, locations, onPress }: ILocationListProps) {
    const hasLocations = locations !== undefined && locations.length > 0;

    if (error && !hasLocations && !loading)
        return <Notification text={error} />

    if (!onPress)
        return <Notification text="Falha de configuração. É necessário informar uma função."/>

    if (hasLocations)
        return (
            <View style={style.listContainer}>
                {locations.map((location) => (
                    <LocationCard
                        location={location}
                        key={location.id.toString()}
                        onPress={() => onPress(location)} />
                ))}
            </View>
        );

    return null;
}

const style = StyleSheet.create({
    listContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15
    }
})