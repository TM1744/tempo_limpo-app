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
            <View style={style.weatherDetailsContainer}>
                <Text style={style.rainMMText}>{rainMM} MM</Text>

                <View style={style.secondaryInfo}>
                    <Text style={style.rainChanceText}>{rainChance}%</Text>
                    <Text style={style.temperatureText}>{temperature}°C</Text>
                </View>
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
        paddingVertical: 20,
    },

    label: {
        color: 'white',
        fontSize: 25,
        letterSpacing: 0.5,
        fontFamily: "JosefinSans-Italic"
    },

    weatherArea: {
        display: "flex",
        flexDirection: "column",
        paddingRight: 5
    },

    weatherDetailsContainer: {
        flexDirection: "column",
        alignItems: 'flex-end',
        gap: 5,
    },

    temperatureText: {
        color: '#FF9800',
        fontSize: 18,
        fontFamily: "Lato-Regular",
    },

    secondaryInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },

    rainChanceText: {
        color: "#00BCD4",
        fontSize: 18,
        fontWeight: '600',
        fontFamily: "Lato-Regular",
    },

    rainMMText: {
        color: "#00BCD4",
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: "Lato-Regular",
    }
});