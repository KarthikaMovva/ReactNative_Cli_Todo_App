import React, { createContext, useState, useContext } from "react";
import { ModalContextType, ProviderProps } from "../Types/Context";

const GlobalContext = createContext<ModalContextType | undefined>(undefined);

export const StateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [warningMessage, setwarningMessage] = useState<string>('');
  const [showWarning, setshowWarning] = useState<boolean>(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const Contextvalues: ModalContextType = {
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

export const useContextvalues = (): ModalContextType => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("Global context must be within Provider");
  }

  return context;
};
