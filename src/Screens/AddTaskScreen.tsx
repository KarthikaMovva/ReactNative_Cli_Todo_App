import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import StatusPicker from '../Components/StatusPicker';
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/TaskSlice';
import WarningModal from '../Components/WarningModal';
import { useNavigation } from '@react-navigation/native';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [warningVisible, setWarningVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAdd = () => {
    if (title.trim()) {
      dispatch(addTask({ title, description, status }));
      navigation.goBack();
  }else{
    setWarningVisible(true);
  }
  };

  return (
    <View style={styles.container}>
<WarningModal
  visible={warningVisible}
  message="Please enter task Title, description and status before adding."
  onClose={() => setWarningVisible(false)}
/>


      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <StatusPicker
        selectedValue={status}
        onValueChange={setStatus}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTask;
