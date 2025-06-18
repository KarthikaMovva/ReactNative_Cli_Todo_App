import React, { createContext, useState, useContext } from 'react';
import { ThemeProviderProps, ThemeContextType } from '../Types/Context';
import Colors from '../Utilities/Colors';

const GlobalTheme = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkTheme, setDarkTheme] = useState<boolean>(false);

    const requiredColors = isDarkTheme ? Colors.darkTheme : Colors.lightTheme;

    console.log(requiredColors,'req Colors')

    const ThemeContextValues: ThemeContextType = {
        isDarkTheme,
        setDarkTheme,
        requiredColors,
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
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }

    return theme;
};
