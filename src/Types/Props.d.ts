import { Task } from "./Redux";
import { GestureResponderEvent, TextStyle } from "react-native";

export interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
  onDeletePress: (task: Task) => void;
  onEndReached?: () => void;
}

export interface WarningModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onChange: (task: Task | null) => void;
  onSave: () => void;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}


type Status = 'pending' | 'in-progress' | 'completed';

export interface StatusPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export interface CustomButtonProps {
  text: string;
  onPress: () => void;
}

export interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  [key: string]: any;
}

export interface SwitchTextProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

export interface TitleProps {
  heading: string;
  style?: TextStyle; 
  onPress?: () => void;
}

export type ToggleSwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};
