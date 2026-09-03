import { StyleSheet, Text, View } from 'react-native';
import { ILocationCardProps } from '../interfaces/props/ILocationCardProps';
import { Press } from './Press';
import { FadeView } from './FadeView';
import { Subtext } from './Subtext';


export function LocationCard({ location, onPress }: ILocationCardProps) {
  if (!location || !onPress) return;

  const name = location?.name;
  const references = location?.references;

  function handlePress() {
    if (location && onPress) onPress(location);
  }

  return (
    <FadeView style={style.container} visible={true}>
      <View style={style.textArea}>
        <Text style={style.name}>{name ?? 'Cianorte'}</Text>
        <Subtext text={references ?? `Indefinido`}/>
      </View>

      <Press iconName={"location"} onPress={handlePress} />
    </FadeView>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
  }
});