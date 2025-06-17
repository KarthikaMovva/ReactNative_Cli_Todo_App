import React from 'react';
import WarningModal from './WarningModal';
import { useContextvalues } from '../Auth/ModalContext';

const GlobalWarning: React.FC = () => {
  const {
    showWarning,
    setshowWarning,
    warningMessage,
    onConfirm,
    isConfirm
  } = useContextvalues();
  return (
    <WarningModal
      visible={showWarning}
      message={warningMessage}
      onClose={() => setshowWarning(false)}
      onConfirm={isConfirm ? onConfirm : undefined}
    />
  );
};

export default GlobalWarning;
