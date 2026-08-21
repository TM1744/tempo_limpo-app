import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IDayCardProps } from '../interfaces/props/IDayCardProps';
import { Press } from './Press';


export function DayCard({ day, onPress }: IDayCardProps) {
  if (!day || !onPress) return <ActivityIndicator size={40} color="white" />


  function handlePress() {
    if (day && onPress) onPress(day);
  }

  const label = day?.defineLabel() ?? "Indefinido";
  const temperature = day?.temperature.toFixed(1).toString() ?? "--";
  const rainMM = day?.rainMM.toFixed(1).toString() ?? "--";
  const rainChance = day?.rainChance.toFixed(0).toString() ?? "--";

  return (
    <View style={style.container}>
      <View style={style.infoArea}>
        <Text style={style.label}>{label}</Text>
        <View style={style.weatherArea}>
          <Text style={style.rainText}>{rainChance}% | {rainMM}MM</Text>
          <Text style={style.temperatureText}>{temperature}°C</Text>
        </View>
      </View>

      <Press iconName={"clock"} onPress={handlePress}/>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: wp(100),
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingLeft: 22,
    gap: 15
  },

  infoArea: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  label: {
    color: 'white',
    fontSize: 22,
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