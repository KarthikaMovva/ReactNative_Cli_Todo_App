import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WarningModalProps } from "../Types/Props"
import Colors from '../Utilities/Colors';
import { ThemeContext } from '../Auth/ThemeContext';

const WarningModal: React.FC<WarningModalProps> = ({ visible, message, onClose, onConfirm }) => {

  const { isDarkTheme } = ThemeContext();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles(isDarkTheme).overlay}> 
        <View style={styles(isDarkTheme).modalContainer}> 
          <Text style={styles(isDarkTheme).message}>{message}</Text> 

          {onConfirm ? (
            <View style={styles(isDarkTheme).buttonRow}>
              <TouchableOpacity onPress={onConfirm} style={[styles(isDarkTheme).button, styles(isDarkTheme).confirm]}>
                <Text style={styles(isDarkTheme).buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={[styles(isDarkTheme).button, styles(isDarkTheme).cancel]}>
                <Text style={styles(isDarkTheme).buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={onClose} style={[styles(isDarkTheme).button, styles(isDarkTheme).confirm]}>
              <Text style={styles(isDarkTheme).buttonText}>OK</Text>
            </TouchableOpacity>
          )}
          
        </View>
      </View>
    </Modal>
  );
};

const styles = (isDarkTheme:boolean) => StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalOverlay
  },
  modalContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor : isDarkTheme? Colors.darkTheme.cardsBackground: Colors.background,
    width: '80%',
    alignItems: 'center'
  },
  message: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
    color : isDarkTheme? Colors.background: Colors.darkText
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
    backgroundColor: Colors.primaryButton,
  },
  cancel: {
    backgroundColor: isDarkTheme? "red": Colors.cancelButton,
  },
  buttonText: {
    color: Colors.background, 
    fontWeight: 'bold',
  },
});

export default WarningModal;