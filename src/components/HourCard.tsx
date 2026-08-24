import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { IHourCardProps } from '../interfaces/props/IHourCardProps';
import { DateTimeFormatter } from '@js-joda/core';
import { FadeView } from './FadeView';


export function HourCard({ hour }: IHourCardProps) {
    if (!hour) return <ActivityIndicator size={40} color="white" />

    const label = hour?.time?.format(DateTimeFormatter.ofPattern("HH:mm")) ?? "--:--";
    const rainChance = hour?.rainChance.toFixed(0).toString() ?? "--";
    const rainMM = hour?.rainMM?.toFixed(1).toString() ?? "--";
    const temperature = hour?.temperature?.toFixed(1).toString() ?? "--";

    return (
        <FadeView style={style.container} visible={true}>
            <Text style={style.label}>{label}</Text>
            <View style={style.weatherArea}>
                <Text style={style.rainText}>{rainChance}% | {rainMM}MM</Text>
                <Text style={style.temperatureText}>{temperature}°C</Text>
            </View>
        </FadeView>
    );
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "auto",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingLeft: 22,
        gap: 15
    },

    label: {
        color: 'white',
        fontSize: 25,
        letterSpacing: 0.5,
        fontFamily: "JosefinSans-Italic"
    },

    rainText: {
        color: "cyan",
        fontFamily: "Lato-Regular",
        fontSize: 18,
        textAlign: "right"
    },

    temperatureText: {
        color: "orange",
        fontFamily: "Lato-Regular",
        fontSize: 18,
        textAlign: "right"
    },

    weatherArea: {
        display: "flex",
        flexDirection: "column",
        paddingRight: 5
    }
});