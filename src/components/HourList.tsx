import { View, StyleSheet } from "react-native";
import { IHourListProps } from "../interfaces/props/IHourListProps";
import { Notification } from "./Notification";
import { HourCard } from "./HourCard";
import { LocalDateTime } from "@js-joda/core";

export function HourList({ hours }: IHourListProps) {
    const hasHours = hours && hours.length > 0;
    const now = LocalDateTime.now().hour();

    if (!hasHours) return <Notification text="Falha ao carregar horas." />;

    if (hasHours)
        return (
            <View style={style.listContainer}>
                {
                    hours.map((hour) => {
                        if(hour.time.hour() >= now) 
                            return <HourCard hour={hour} key={hour.id.toString()}/>
                    })
                }
            </View>
        );

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