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
import { AppColorsType } from '../Utilities/Colors';
import { StatusPickerProps } from '../Types/Props';
import { TaskStatus } from '../Utilities/Utilities';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../Auth/ThemeContext';

const StatusPicker: React.FC<StatusPickerProps> = ({ selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { requiredColors } = ThemeContext();

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles(requiredColors).pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles(requiredColors).pickerButtonText}>
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
          <View style={styles(requiredColors).modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles(requiredColors).modalContent}>
                <FlatList
                  data={Object.values(TaskStatus)}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles(requiredColors).option}
                      onPress={() => handleSelect(item)}
                    >
                      <Ionicons
                        name={
                          item === selectedValue
                            ? 'radio-button-on'
                            : 'radio-button-off'
                        }
                        size={20}
                        color={requiredColors.brightBlue}
                        style={styles(requiredColors).radioIcon}
                      />
                      <Text style={styles(requiredColors).optionText}>{item}</Text>
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

const styles = (requiredColors:AppColorsType)=>StyleSheet.create({
  pickerButton: {
    backgroundColor: requiredColors.MovieCardBackground,
    borderWidth : 1,
    borderColor : requiredColors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
  },
  pickerButtonText: {
    fontSize: 16,
    color: requiredColors.darkText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: requiredColors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: requiredColors.background,
    borderRadius: 10,
    width: '80%',
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  radioIcon: {
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    color: requiredColors.darkText,
  },
});

export default StatusPicker;
