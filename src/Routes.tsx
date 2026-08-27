import { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import { SafeView } from "./components/SafeView";
import { ActivityIndicator, View } from "react-native";
import { LocationService } from "./services/LocationService";
import { Location } from "./classes/Location";
import { LocationScreen } from "./screens/LocationScreen";
import { WeatherScreen } from "./screens/WeatherScreen";
import { HourScreen } from "./screens/HourScreen";
import { StackType } from "./types/StackType";
import { UserAgentService } from "./services/UserAgentService";
import { UserAgentScreen } from "./screens/UserAgentScreen";


const Stack = createNativeStackNavigator<StackType>();

export default function Routes() {
    const [loading, setLoading] = useState<boolean>(true);
    const [location, setLocation] = useState<Location | undefined>(undefined);
    const [userAgent, setUserAgent] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadResources = async () => {
            setLoading(true)

            setUserAgent(undefined);
            const userAgent = await UserAgentService.getSavedUserAgent();
            if (userAgent.isOk) setUserAgent(userAgent.value);
            else {
                setLoading(false);
                return;
            }

            setLocation(undefined);
            const savedLocation = await LocationService.getSavedLocation();
            if (savedLocation.isOk) setLocation(savedLocation.value);

            setLoading(false);

            return;
        };

        loadResources();
    }, []);

    function defineInitialScreen(): "UserAgent" | "Locations" | "Weather" {
        if (!userAgent) return "UserAgent";
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
                    <Stack.Screen name="UserAgent" component={UserAgentScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}