import React, { createContext, useContext } from 'react';
import { ThemeProviderProps, ThemeContextType } from '../Types/Context';
import { RootState } from '../Redux/Store';
import { useSelector } from 'react-redux';
import Colors from '../Utilities/Colors';

const GlobalTheme = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    const isDarkTheme = useSelector((state: RootState) => state.users.currentUser?.theme);
    const requiredColors = isDarkTheme ? Colors.darkTheme : Colors.lightTheme;

    const ThemeContextValues: ThemeContextType = {
        requiredColors,
    };

    return (
        <GlobalTheme.Provider value={ThemeContextValues}>
            {children}
        </GlobalTheme.Provider>
    );
};

export const useThemeContext = (): ThemeContextType => {
  const theme = useContext(GlobalTheme);
  if (!theme) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return theme;
};

