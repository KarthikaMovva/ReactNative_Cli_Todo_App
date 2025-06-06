import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../Utilities/Colors';
import { StatusPickerProps } from '../Types/Props.Types';
import { TaskStatus } from '../Utilities/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const StatusPicker: React.FC<StatusPickerProps> = ({ selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerButtonText}>
          {selectedValue || 'Select status'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <FlatList
                  data={Object.values(TaskStatus)}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => handleSelect(item)}
                    >
                      <Ionicons
                        name={
                          item === selectedValue
                            ? 'radio-button-on'
                            : 'radio-button-off'
                        }
                        size={20}
                        color={Colors.primaryButton}
                        style={styles.radioIcon}
                      />
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  pickerButtonText: {
    fontSize: 16,
    color: Colors.darkText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    width: '80%',
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  radioIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: Colors.darkText,
  },
});

export default StatusPicker;
