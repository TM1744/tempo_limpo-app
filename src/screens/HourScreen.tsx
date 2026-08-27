import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackType } from "../types/StackType";
import { SafeView } from "../components/SafeView";
import { Title } from "../components/Title";
import { HourList } from "../components/HourList";
import { Press } from "../components/Press";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";

type HoursRouteProp = RouteProp<StackType, 'Hours'>;

export function HourScreen() {
    const route = useRoute<HoursRouteProp>();
    const { day } = route.params || {};
    const navigation = useNavigation();


    const label = day ? "Previsão de " + day.defineLabel() : "Previsão";

    return (
        <SafeView>
            <Header>
                <Title text={label} />
            </Header>
            <Main>
                <HourList hours={day?.hours} />
            </Main>
            <Footer>
                <Press onPress={() => navigation.goBack()}
                    iconName="arrow-left" />
            </Footer>
        </SafeView>
    );
}