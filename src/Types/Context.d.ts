import { AppColorsType } from '../Utilities/Colors';

export interface ModalContextType {
  WarningMessage: string;
  setWarningMessage: React.Dispatch<React.SetStateAction<string>>;
  ShowWarning: boolean;
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  OnConfirm?: () => void;
  setOnConfirm: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
  IsConfirm: boolean;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ThemeContextType {
    isDarkTheme: boolean;
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
    requiredColors : AppColorsType
}

export interface ThemeProviderProps {
    children: ReactNode;
}




