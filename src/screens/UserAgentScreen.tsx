import { StyleSheet } from "react-native";
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

    return (
        <SafeView>
            <Header>
                <Title text="Configuração inicial" />
            </Header>

            <Main>
                <InputField buttonIconName="arrow-right" placeHolder="Informe seu E-mail..."
                    loading={loading} onPressButton={saveUserAgent} />

                <Subtext text={`Seu E-mail será utilizado apenas como User-Agent para requisições` +
                    ` das APIs OpenMeteo e Nominatim. Para mais informações, veja a documentação do` +
                    ` projeto no GitHub.`} style={style.text} />

                {error && <Notification text={error} />}
            </Main>
        </SafeView>
    );
}

const style = StyleSheet.create({
    text: {
        textAlign: "justify"
    }
});