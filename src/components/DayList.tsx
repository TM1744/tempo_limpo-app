import { ActivityIndicator, StyleSheet, View } from "react-native";
import { IDayListProps } from "../interfaces/props/IDayListProps";
import { Notification } from "./Notification";
import { DayCard } from "./DayCard";

export function DayList({ loading, error, days, onPress }: IDayListProps) {
    if (loading || !days || days.length === 0)
        return <ActivityIndicator size={40} color="white" />

    if (error && (!days || days.length === 0) && !loading)
        return <Notification text={error} />

    if (!onPress)
        return <Notification text="Falha de configuração. É necessário informar uma função."/>

    return (
        <View style={style.listContainer}>
            {days.map((day) => (
                <DayCard
                    day={day}
                    key={day.id.toString()}
                    onPress={() => onPress(day)} />
            ))}
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