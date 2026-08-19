import Routes from "./src/Routes";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'JosefinSans': require('./assets/fonts/JosefinSans-Bold.ttf'),
    'JosefinSans-Italic': require('./assets/fonts/JosefinSans-BoldItalic.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Retorna nulo enquanto carrega para evitar erros de renderização
  }


  return (
    <Routes/>
  );
}