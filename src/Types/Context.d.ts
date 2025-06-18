export interface ModalContextType {
  warningMessage: string;
  setwarningMessage: React.Dispatch<React.SetStateAction<string>>;
  showWarning: boolean;
  setshowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: () => void;
  setOnConfirm: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
  isConfirm: boolean;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ThemeContextType {
    isDarkTheme: boolean;
    setisDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ThemeProviderProps {
    children: ReactNode;
}




