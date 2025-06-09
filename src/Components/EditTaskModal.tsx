import React from 'react';
import { Modal, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Task } from '../Types/Redux.Types';
import StatusPicker from './StatusPicker';
import Colors from '../Utilities/Colors';

interface Props {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onChange: (task: Task | null) => void;
  onSave: () => void;
}

const EditTaskModal: React.FC<Props> = ({ visible, task, onClose, onChange, onSave }) => {
  if (!task) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={Colors.mediumText}
          value={task.title}
          onChangeText={text => onChange({ ...task, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor={Colors.mediumText}
          value={task.description}
          onChangeText={text => onChange({ ...task, description: text })}
        />
        <StatusPicker
          selectedValue={task.status}
          onValueChange={status => onChange({ ...task, status })}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
    color: Colors.darkText,
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
