import { StyleSheet, View } from "react-native";
import { IDayListProps } from "../interfaces/props/IDayListProps";
import { Notification } from "./Notification";
import { DayCard } from "./DayCard";
import { LocalDate } from "@js-joda/core";

export function DayList({ loading, error, days, onPress }: IDayListProps) {
    const hasDays = days !== undefined && days.length > 0;
    const now = LocalDate.now();

    if (error && !hasDays && !loading)
        return <Notification text={error} />

    if (!onPress)
        return <Notification text="Falha de configuração. É necessário informar uma função." />

    if (hasDays)
        return (
            <View style={style.listContainer}>
                {days.map((day) => {
                    if (!day.date.isBefore(now))
                        return (
                            <DayCard
                                day={day}
                                key={day.id.toString()}
                                onPress={() => onPress(day)} />
                        );
                })}
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