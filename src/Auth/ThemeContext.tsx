import React, { createContext, useState, useContext } from 'react';
import { ThemeProviderProps, ThemeContextType } from '../Types/Context';

const GlobalTheme = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkTheme, setisDarkTheme] = useState<boolean>(false);

    const ThemeContextValues: ThemeContextType = {
        isDarkTheme,
        setisDarkTheme
    };

    return (
        <GlobalTheme.Provider value={ThemeContextValues}>
            {children}
        </GlobalTheme.Provider>
    );
};

export const ThemeContext = (): ThemeContextType => {
    const theme = useContext(GlobalTheme);

    if (theme === undefined) {
        throw new Error("useThemeContext must be used within a ThemeProvider");
    }

    return theme;
};