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
import { StatusPickerProps } from '../Types/Props';
import { TaskStatus } from '../Utilities/StatusAndColors';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { ThemeContext } from '../Auth/ThemeContext';

const StatusPicker: React.FC<StatusPickerProps> = ({ selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkTheme } = ThemeContext();

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles(isDarkTheme).pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles(isDarkTheme).pickerButtonText}>
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
          <View style={styles(isDarkTheme).modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles(isDarkTheme).modalContent}>
                <FlatList
                  data={Object.values(TaskStatus)}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles(isDarkTheme).option}
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
                        style={styles(isDarkTheme).radioIcon}
                      />
                      <Text style={styles(isDarkTheme).optionText}>{item}</Text>
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

const styles = (isDarkTheme:boolean)=>StyleSheet.create({
  pickerButton: {
    backgroundColor: isDarkTheme? Colors.darkTheme.cardsBackground: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
  },
  pickerButtonText: {
    fontSize: 16,
    color: isDarkTheme? Colors.loginBackground: Colors.darkText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: isDarkTheme? Colors.darkTheme.cardsBackground: Colors.background,
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
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    color: isDarkTheme? Colors.loginBackground: Colors.darkText,
  },
});

export default StatusPicker;
