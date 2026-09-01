import { Linking, StyleSheet } from "react-native";
import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { InputField } from "../components/InputField";
import { useState } from "react";
import { UserAgentService } from "../services/UserAgentService";
import { Notification } from "../components/Notification";
import { Subtext } from "../components/Subtext";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { Press } from "../components/Press";

export function UserAgentScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    async function saveUserAgent(email: string) {
        setLoading(true);
        setError(undefined);
        const result = await UserAgentService.saveUserAgent(email);
        if (!result.isOk) setError(result.error);
        setLoading(false);
        if (result.isOk) navigation.navigate(`Locations`);
        return;
    }

    async function handleLinkPress() {
        try {
            setError(undefined);
            await Linking.openURL('https://github.com/TM1744/tempo_limpo-app.git');
        } catch {
            setError("Falha ao redirecionar para o repositório do projeto.");
        }
    };

    return (
        <SafeView>
            <Header>
                <Title text="Configuração inicial" />
            </Header>

            <Main>
                <InputField buttonIconName="arrow-right" placeHolder="Informe seu E-mail..."
                    loading={loading} onPressButton={saveUserAgent} />

                <Subtext
                    style={{ textAlign: "justify" }}
                    text={`Seu E-mail será utilizado apenas como User-Agent para requisições` +
                        ` das APIs OpenMeteo e Nominatim. Para mais informações, veja a documentação do` +
                        ` projeto no GitHub.`} />

                {error && <Notification text={error} />}
            </Main>

            <Footer style={{ gap: 20 }}>
                {!loading && <Press iconName="sc-github" loading={false} onPress={handleLinkPress} />}
                {!loading && <Press iconName="gear" loading={false} onPress={console.log} />}
            </Footer>
        </SafeView>
    );
}