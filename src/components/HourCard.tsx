import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IHourCardProps } from '../interfaces/props/IHourCardProps';
import { DateTimeFormatter } from '@js-joda/core';


export function HourCard({ hour }: IHourCardProps) {
    if (!hour) return <ActivityIndicator size={40} color="white" />

    const label = hour?.time?.format(DateTimeFormatter.ofPattern("HH:mm")) ?? "--:--";
    const rainChance = hour?.rainChance.toFixed(0).toString() ?? "--";
    const rainMM = hour?.rainMM?.toFixed(1).toString() ?? "--";
    const temperature = hour?.temperature?.toFixed(1).toString() ?? "--";

    return (
        <View style={style.container}>
                <Text style={style.label}>{label}</Text>
                <View style={style.weatherArea}>
                    <Text style={style.rainText}>{rainChance}% | {rainMM}MM</Text>
                    <Text style={style.temperatureText}>{temperature}°C</Text>
                </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: wp(100),
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