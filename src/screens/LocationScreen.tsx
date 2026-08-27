import { View, StyleSheet, ScrollView } from "react-native";
import { SafeView } from "../components/SafeView";
import { InputField } from "../components/InputField";
import { Title } from "../components/Title";
import { useLocation } from "../hooks/useLocation";
import { LocationList } from "../components/LocationList";
import { Press } from "../components/Press";
import { FadeView } from "../components/FadeView";

export function LocationScreen() {
    const { locations, loading, error, saveAndNavigate, fetchLocations } = useLocation();

    return (
        <SafeView style={style.container}>
            <View style={style.header}>
                <Title text="Buscar localidade" />
            </View>

            <ScrollView style={style.main}
                contentContainerStyle={style.mainContent}
            >
                <InputField loading={loading} onPressButton={fetchLocations}
                    buttonIconName="search" placeHolder="Buscar localização..." />
                <LocationList locations={locations} loading={loading}
                    error={error} onPress={saveAndNavigate} />
            </ScrollView>

            <FadeView style={style.footer} visible>
                <Press iconName="gear" onPress={() => console.log("mensagem")} />
            </FadeView>
        </SafeView>

    );
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },

    header: {
        width: "auto",
        height: "auto",
        paddingBottom: 20
    },

    main: {
        flex: 1,
        width: "100%",
        height: "auto"
    },

    mainContent: {
        flexGrow: 1,
        justifyContent: "flex-start",
        gap: 30
    },

    footer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        paddingTop: 20,
        height: "auto",
        justifyContent: "flex-end"
    }
});