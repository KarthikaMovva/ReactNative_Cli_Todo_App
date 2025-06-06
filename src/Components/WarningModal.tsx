import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WarningModalProps } from "../Types/Props.Types"
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
    backgroundColor: Colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.darkText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.darkText,
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