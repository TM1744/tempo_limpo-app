import { ScrollViewProps } from "react-native";

export interface ISafeViewProps extends ScrollViewProps {
    children?: React.ReactNode;
}