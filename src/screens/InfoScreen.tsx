import { useNavigation } from "@react-navigation/native";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { Press } from "../components/Press";
import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { Subtext } from "../components/Subtext";
import { Header } from "../components/Header";

export function InfoScreen() {
    const navigation = useNavigation();

    return (
        <SafeView>
            <Header>
                <Title text="Sobre" />
            </Header>

            <Main style={{}}>
                <Subtext text="Link do repositório: https://github.com/TM1744/tempo_limpo-app.git"/>
                <Subtext text="Fonte de Dados:"/>
                <Subtext text="Localização e Geocodificação: Este aplicativo utiliza a API Nominatim e dados do OpenStreetMap (disponibilizados sob a licença ODbL)."/>
                <Subtext text="Dados Meteorológicos: Previsão do tempo fornecida por Open-Meteo.com (sob licença CC BY 4.0)."/>
            </Main>

            <Footer>
                <Press iconName="arrow-left" onPress={() => navigation.goBack()} />
            </Footer>
        </SafeView>
    );
}