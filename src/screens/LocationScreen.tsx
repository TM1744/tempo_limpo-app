import { SafeView } from "../components/SafeView";
import { InputField } from "../components/InputField";
import { Title } from "../components/Title";
import { useLocation } from "../hooks/useLocation";
import { LocationList } from "../components/LocationList";
import { Press } from "../components/Press";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { useNavigation } from "@react-navigation/native";

export function LocationScreen() {
    const { locations, loading, error, saveAndNavigate, fetchLocations } = useLocation();

    const navigation = useNavigation();

    return (
        <SafeView>
            <Header>
                <Title text="Buscar localidade" />
            </Header>

            <Main>
                <InputField loading={loading} onPressButton={fetchLocations}
                    buttonIconName="search" placeHolder="Buscar localização..." />
                <LocationList locations={locations} loading={loading}
                    error={error} onPress={saveAndNavigate} />
            </Main>

            <Footer>
                <Press iconName="question" onPress={() => navigation.navigate('Info')} />
            </Footer>
        </SafeView>
    );
}