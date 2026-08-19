import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeView } from "./components/SafeView";
import { ActivityIndicator, View } from "react-native";
import { LocationService } from "./services/LocationService";
import { Location } from "./classes/Location";
import { LocationScreen } from "./screens/LocationScreen";
import { WeatherScreen } from "./screens/WeatherScreen";
import { HourScreen } from "./screens/HourScreen";


const Stack = createNativeStackNavigator();

export default function Routes() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [location, setLocation] = useState<Location | undefined>(undefined);

    useEffect(() => {
        const loadSavedLocation = async () => {
            try {
                const savedLocation = await LocationService.getSavedLocation();

                if (savedLocation) {
                    setLocation(savedLocation);
                }
            } catch (error) {
                console.error("Erro ao carregar localização:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSavedLocation();
    }, []);

    if (isLoading) {
        return (
            <SafeView>
                <View>
                    <ActivityIndicator size={"large"} color={"grey"}/>
                </View>
            </SafeView>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={location ? "Weather" : "Locations"}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Locations" component={LocationScreen} />
                <Stack.Screen name="Weather" component={WeatherScreen} />
                <Stack.Screen name="Hours" component={HourScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}