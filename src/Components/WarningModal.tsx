import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WarningModalProps } from '../Types/Props';
import { AppColorsType } from '../Utilities/Colors';
import { ThemeContext } from '../Auth/ThemeContext';

const WarningModal: React.FC<WarningModalProps> = ({ visible, message, onClose, onConfirm }) => {

  const { requiredColors } = ThemeContext();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles(requiredColors).overlay}>
        <View style={styles(requiredColors).modalContainer}>
          <Text style={styles(requiredColors).message}>{message}</Text>

          {onConfirm ? (
            <View style={styles(requiredColors).buttonRow}>
              <TouchableOpacity onPress={onConfirm} style={[styles(requiredColors).button, styles(requiredColors).confirm]}>
                <Text style={styles(requiredColors).buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={[styles(requiredColors).button, styles(requiredColors).cancel]}>
                <Text style={styles(requiredColors).buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={onClose} style={[styles(requiredColors).button, styles(requiredColors).confirm]}>
              <Text style={styles(requiredColors).buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = (requiredColors:AppColorsType) => StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: requiredColors.modalOverlay,
  },
  modalContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor : requiredColors.MovieCardBackground,
    width: '80%',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
    color : requiredColors.darkText,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  confirm: {
    backgroundColor: requiredColors.brightBlue,
  },
  cancel: {
    backgroundColor: requiredColors.deleteIconColor,
  },
  buttonText: {
    color: requiredColors.background,
    fontWeight: 'bold',
  },
});

export default WarningModal;
