import React, { createContext, useState, useContext } from 'react';
import { ModalContextType, ProviderProps } from '../Types/Context';

const GlobalContext = createContext<ModalContextType | undefined>(undefined);

export const StateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [WarningMessage, setWarningMessage] = useState<string>('');
  const [ShowWarning, setShowWarning] = useState<boolean>(false);
  const [OnConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);
  const [IsConfirm, setIsConfirm] = useState<boolean>(false);

  const ContextValues: ModalContextType = {
    WarningMessage,
    setWarningMessage,
    ShowWarning,
    setShowWarning,
    OnConfirm,
    setOnConfirm,
    IsConfirm,
    setIsConfirm,
  };

  return (
    <GlobalContext.Provider value={ContextValues}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useContextValues = (): ModalContextType => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('Global context must be within Provider');
  }

  return context;
};
