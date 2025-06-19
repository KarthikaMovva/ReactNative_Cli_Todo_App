import React from 'react';
import WarningModal from './WarningModal';
import { useContextValues } from '../Auth/ModalContext';

const GlobalWarning: React.FC = () => {
  const {
    ShowWarning,
    setShowWarning,
    WarningMessage,
    OnConfirm,
    IsConfirm,
  } = useContextValues();
  return (
    <WarningModal
      visible={ShowWarning}
      message={WarningMessage}
      onClose={() => setShowWarning(false)}
      onConfirm={IsConfirm ? OnConfirm : undefined}
    />
  );
};

export default GlobalWarning;
