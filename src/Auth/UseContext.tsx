import React, { createContext, useState, useContext, ReactNode } from "react";

interface ContextType {
  warningMessage: string;
  setwarningMessage: React.Dispatch<React.SetStateAction<string>>;
  showWarning: boolean;
  setshowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: () => void;
  setOnConfirm: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
  isConfirm: boolean;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const StateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [warningMessage, setwarningMessage] = useState<string>('');
  const [showWarning, setshowWarning] = useState<boolean>(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const Contextvalues: ContextType = {
    warningMessage,
    setwarningMessage,
    showWarning,
    setshowWarning,
    onConfirm,
    setOnConfirm,
    isConfirm,
    setIsConfirm
  };

  return (
    <GlobalContext.Provider value={Contextvalues}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useContextvalues = (): ContextType => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("Global context must be within Provider");
  }

  return context;
};
