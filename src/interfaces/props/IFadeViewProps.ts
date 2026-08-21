import { ViewProps } from "react-native";

export interface IFadeViewProps extends ViewProps {
  visible: boolean;
  children: React.ReactNode;
}