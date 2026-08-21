import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ILocationCardProps } from '../interfaces/props/ILocationCardProps';
import { Press } from './Press';


export function LocationCard({ location, onPress }: ILocationCardProps) {
  if (!location || !onPress) return <ActivityIndicator size={40} color="white" />

  const name = location?.name;
  const references = location?.references;

  function handlePress() {
    if (location && onPress) onPress(location);
  }

  return (
    <View style={style.container}>
      <View style={style.textArea}>
        <Text style={style.name}>{name ?? 'Cianorte'}</Text>
        <Text style={style.references}>
          {references ?? 'Paraná, Cianorte, 87200-00, Brasil, Sul'}
        </Text>

      </View>

      <Press iconName={"location"} onPress={handlePress}/>
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

  textArea: {
    gap: 6,
    flex: 1
  },

  name: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 0.5,
    fontFamily: "JosefinSans-Italic"
  },

  references: {
    color: '#A0A5BD', // Tom cinza suave para subtexto
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Lato-Regular"
  }
});