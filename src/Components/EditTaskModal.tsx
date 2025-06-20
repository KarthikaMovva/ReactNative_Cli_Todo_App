import React from 'react';
import { Modal, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { EditModalProps } from '../Types/Props';
import StatusPicker from './StatusPicker';
import { useThemeContext } from '../Auth/ThemeContext';
import { AppColorsType } from '../Utilities/Colors';

const EditTaskModal: React.FC<EditModalProps> = ({ visible, task, onClose, onChange, onSave }) => {
  const { requiredColors } = useThemeContext();
  if (!task) { return null; }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles(requiredColors).container}>
        <TextInput
          style={styles(requiredColors).input}
          placeholder="Title"
          placeholderTextColor={requiredColors.mediumText}
          value={task.title}
          onChangeText={text => onChange({ ...task, title: text })}
        />
        <TextInput
          style={styles(requiredColors).input}
          placeholder="Description"
          placeholderTextColor={requiredColors.mediumText}
          value={task.description}
          onChangeText={text => onChange({ ...task, description: text })}
        />
        <StatusPicker
          selectedValue={task.status}
          onValueChange={status => onChange({ ...task, status })}
        />

        <View style={styles(requiredColors).buttonRow}>
          <TouchableOpacity style={styles(requiredColors).closeButton} onPress={onClose}>
            <Text style={styles(requiredColors).buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles(requiredColors).saveButton} onPress={onSave}>
            <Text style={styles(requiredColors).buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = (requiredColors:AppColorsType)=>StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: requiredColors.background,
  },
  input: {
    backgroundColor: requiredColors.MovieCardBackground,
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: requiredColors.lightGray,
    fontSize: 16,
    color: requiredColors.darkText,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: requiredColors.saveButton,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: requiredColors.dangerButton,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: requiredColors.darkText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditTaskModal;
