import { EvilIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type EvilIconName = ComponentProps<typeof EvilIcons>['name'];


export interface IInputFieldProps {
    onPressButton?(value: string) : void;
    loading?: boolean;
    buttonIconName?: EvilIconName;
    placeHolder?: string;
}