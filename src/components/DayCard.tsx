import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { IDayCardProps } from '../interfaces/props/IDayCardProps';
import { FadeView } from './FadeView';
import { Press } from './Press';

export function DayCard({ day, onPress }: IDayCardProps) {
  if (!day || !onPress) return <ActivityIndicator size={40} color="white" />

  const handlePress = () => {
    if (day && onPress) onPress(day);
  };

  const label = day?.defineLabel() ?? "Indefinido";
  const temperature = day?.temperature.toFixed(1).toString() ?? "--";
  const rainMM = day?.rainMM.toFixed(1).toString() ?? "--";
  const rainChance = day?.rainChance.toFixed(0).toString() ?? "--";

  return (
    <FadeView style={style.container} visible={true}>
      <View style={style.infoArea}>
        <Text style={style.label}>{label}</Text>

        <View style={style.weatherDetailsContainer}>
          <Text style={style.temperatureText}>{temperature}°C</Text>
          
          <View style={style.secondaryInfo}>
            <Text style={style.rainChanceText}>{rainChance}%</Text>
            <Text style={style.rainMMText}>{rainMM} MM</Text>
          </View>
        </View>
      </View>

      <Press iconName={"clock"} onPress={handlePress} />
    </FadeView>
  );
}


const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: '100%', 
    height: "auto",
    justifyContent: "space-between", 
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
    borderRadius: 15,
    paddingLeft: 22, 
  },

  infoArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  label: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.5,
    fontFamily: "JosefinSans-Italic",
  },

  weatherDetailsContainer: {
    flexDirection: "column",
    alignItems: 'flex-end',
    gap: 5,
  },

  temperatureText: {
    color: "#FF9800",
    fontSize: 42,
    fontWeight: 'bold',
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
    color: '#9e9e9e',
    fontSize: 18,
    fontFamily: "Lato-Regular",
  }
});
