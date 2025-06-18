import React from 'react';
import { Modal, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { EditModalProps } from '../Types/Props';
import StatusPicker from './StatusPicker';
import Colors from '../Utilities/Colors';
import { ThemeContext } from '../Auth/ThemeContext';

const EditTaskModal: React.FC<EditModalProps> = ({ visible, task, onClose, onChange, onSave }) => {
  const { isDarkTheme } = ThemeContext();
  if (!task) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles(isDarkTheme).container}>
        <TextInput
          style={styles(isDarkTheme).input}
          placeholder="Title"
          placeholderTextColor={isDarkTheme? Colors.loginBackground: Colors.mediumText}
          value={task.title}
          onChangeText={text => onChange({ ...task, title: text })}
        />
        <TextInput
          style={styles(isDarkTheme).input}
          placeholder="Description"
          placeholderTextColor={isDarkTheme? Colors.loginBackground: Colors.mediumText}
          value={task.description}
          onChangeText={text => onChange({ ...task, description: text })}
        />
        <StatusPicker
          selectedValue={task.status}
          onValueChange={status => onChange({ ...task, status })}
        />

        <View style={styles(isDarkTheme).buttonRow}>
          <TouchableOpacity style={styles(isDarkTheme).closeButton} onPress={onClose}>
            <Text style={styles(isDarkTheme).buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles(isDarkTheme).saveButton} onPress={onSave}>
            <Text style={styles(isDarkTheme).buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = (isDarkTheme:boolean)=>StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: isDarkTheme? Colors.darkTheme.darkBackground: Colors.background,
  },
  input: {
    backgroundColor: isDarkTheme? Colors.darkTheme.cardsBackground: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
    color: isDarkTheme? Colors.loginBackground: Colors.darkText,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: Colors.saveButton,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: Colors.dangerButton,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditTaskModal;
