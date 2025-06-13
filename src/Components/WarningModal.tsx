import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WarningModalProps } from "../Types/Props"
import Colors from '../Utilities/Colors';

const WarningModal: React.FC<WarningModalProps> = ({ visible, message, onClose, onConfirm }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}> 
        <View style={styles.modalContainer}> 
          <Text style={styles.message}>{message}</Text> 

          {onConfirm ? (
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirm]}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancel]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.confirm]}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalOverlay
  },
  modalContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor : Colors.background,
    width: '80%',
    alignItems: 'center'
  },
  message: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
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
    backgroundColor: Colors.cancelButton,
  },
  buttonText: {
    color: Colors.background, 
    fontWeight: 'bold',
  },
});

export default WarningModal;