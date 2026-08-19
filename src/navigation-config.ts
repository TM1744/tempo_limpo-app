import { StackType } from "./types/StackType";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends StackType { }
    }
}