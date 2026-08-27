import { View, StyleSheet, ScrollView } from "react-native";
import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { InputField } from "../components/InputField";
import { useState } from "react";
import { UserAgentService } from "../services/UserAgentService";
import { Notification } from "../components/Notification";
import { Subtext } from "../components/Subtext";
import { useNavigation } from "@react-navigation/native";

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
        <SafeView style={style.container}>
            <View style={style.header}>
                <Title text="Configuração inicial" />
            </View>

            <ScrollView style={style.main}
                contentContainerStyle={style.mainContent}
            >
                <InputField buttonIconName="arrow-right" placeHolder="Informe seu E-mail..."
                    loading={loading} onPressButton={saveUserAgent} />

                <Subtext text={`Seu E-mail será utilizado apenas como User-Agent para requisições` +
                    ` das APIs OpenMeteo e Nominatim. Para mais informações, veja a documentação do` +
                    ` projeto no GitHub.`} style={style.text}/>

                {error && <Notification text={error} />}
            </ScrollView>
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
        alignItems: "center",
        gap: 30
    },

    text: {
        textAlign: "justify"
    }
});