import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { View, StyleSheet } from "react-native";
import { LocationCard } from "../components/LocationCard";
import { useWeather } from "../hooks/useWeather";
import { DayList } from "../components/DayList";
import { Press } from "../components/Press";

export function WeatherScreen() {
    const { location, weather, loading, error, removeAndReturn, navigateToHours, fetchWeather } = useWeather();

    return (
        <SafeView>
            {/* Container principal que controla o padding lateral e vertical do conteúdo total */}
            <View style={style.screenContainer}>

                {/* Bloco 1: Título Principal */}
                <Title text="Previsão" />

                {/* Blocos de Informação/Controle (Localização e Refresh) - Agrupados para parecer um módulo */}
                <View style={style.infoBlock}>
                    <LocationCard location={location} onPress={removeAndReturn} />

                    {/* O botão de refresh deve estar visível e alinhado com o conteúdo, mas não deve ter um gap exagerado do card */}
                    {/* Removi o FadeView aqui pois ele pode desorganizar a estrutura. */}
                    <Press
                        loading={loading}
                        iconName={"refresh"}
                        onPress={() => fetchWeather(location)}
                    />
                </View>

                {/* Bloco 2: Conteúdo Principal - Deve preencher o restante da tela verticalmente */}
                {/* Usar flex-1 garante que este bloco "empurre" todos os outros elementos para cima e ocupa todo o espaço disponível. */}
                <View style={style.mainContentContainer}>
                    <DayList
                        days={weather?.days}
                        error={error}
                        loading={loading}
                        onPress={navigateToHours}
                    />
                </View>

            </View>
        </SafeView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 30,
    },

    screenContainer: {
        flex: 1,
        gap: 35,               // Aumentei o gap entre os blocos principais (Título, InfoBlock e DayList)
        paddingHorizontal: 20
    },

    infoBlock: {
        gap: 20, // Espaço vertical mais adequado entre o card e o botão
        marginBottom: 15, // Um pequeno espaçamento antes do conteúdo principal começar
    },

    mainContentContainer: {
        flex: 1, // ESSENCIAL: Faz com que esta View preencha verticalmente o espaço livre
        justifyContent: 'flex-start', // Alinha o conteúdo no topo (se DayList for menor que a tela)
    }
});