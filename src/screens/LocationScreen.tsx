import { View, StyleSheet } from "react-native";
import { SafeView } from "../components/SafeView";
import { InputField } from "../components/InputField";
import { Title } from "../components/Title";
import { useLocation } from "../hooks/useLocation";
import { LocationList } from "../components/LocationList";

export function LocationScreen() {
    const {locations, loading, error, saveAndNavigate, fetchLocations} = useLocation();

    return (
        <SafeView>
            <View style={styles.container}>
                <Title text="Buscar localidade" />
                <InputField loading={loading} onPressButton={fetchLocations} buttonIconName="search"/>
                <LocationList locations={locations} loading={loading} 
                    error={error} onPress={saveAndNavigate}/>
            </View>
        </SafeView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 30,
        paddingHorizontal: 20
    }
});