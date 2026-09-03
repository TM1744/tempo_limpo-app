import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import { SafeView } from "./components/SafeView";
import { ActivityIndicator, View } from "react-native";
import { LocationService } from "./services/LocationService";
import { Location } from "./classes/Location";
import { LocationScreen } from "./screens/LocationScreen";
import { WeatherScreen } from "./screens/WeatherScreen";
import { HourScreen } from "./screens/HourScreen";
import { StackType } from "./types/StackType";
import { StackScreen } from "react-native-screens";
import { InfoScreen } from "./screens/InfoScreen";


const Stack = createNativeStackNavigator<StackType>();

export default function Routes() {
    const [loading, setLoading] = useState<boolean>(true);
    const [location, setLocation] = useState<Location | undefined>(undefined);

    useEffect(() => {
        const loadResources = async () => {
            setLoading(true)

            setLocation(undefined);
            const savedLocation = await LocationService.getSavedLocation();
            if (savedLocation.isOk) setLocation(savedLocation.value);

            setLoading(false);

            return;
        };

        loadResources();
    }, []);

    function defineInitialScreen(): "Locations" | "Weather" {
        if (!location) return "Locations";
        return "Weather";
    }

    if (loading) {
        return (
            <SafeView>
                <View>
                    <ActivityIndicator size={"large"} color={"grey"} />
                </View>
            </SafeView>
        );
    }

    if (!loading) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={defineInitialScreen()}
                    screenOptions={{ headerShown: false, animation: "fade_from_bottom", presentation: "modal" }}>
                    <Stack.Screen name="Locations" component={LocationScreen} />
                    <Stack.Screen name="Weather" component={WeatherScreen} />
                    <Stack.Screen name="Hours" component={HourScreen} />
                    <Stack.Screen name="Info" component={InfoScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}