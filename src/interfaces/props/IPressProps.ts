import { EvilIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type EvilIconName = ComponentProps<typeof EvilIcons>['name'];

export interface IPressProps<Args extends any[] = any[], Result = void> {
    onPress?: (...args: Args) => Result;
    iconName?: EvilIconName;
    loading?: boolean;
}