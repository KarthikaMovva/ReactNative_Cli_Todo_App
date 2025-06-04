import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import StatusPicker from '../Components/StatusPicker';
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/TaskSlice';
import Colors from '../Utilities/Colors';
import WarningModal from '../Components/WarningModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Auth/authContext';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [warningVisible, setWarningVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentUserEmail } = useAuth();

  const handleAdd = () => {
    if (title.trim() && currentUserEmail) {
      dispatch(addTask({ title, description: description.trim() ? description : 'No description', status, userEmail: currentUserEmail }));
      navigation.goBack();
    } else {
      setWarningVisible(true);
    }
  };

  const handleClose = () => {
    setWarningVisible(false);
  };

  return (
    <View style={styles.container}>
      <WarningModal
        visible={warningVisible}
        message="Please enter task Title, description and status before adding, and ensure you are logged in."
        onClose={handleClose}
      />

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={Colors.mediumText}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={Colors.mediumText}
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
    backgroundColor: Colors.background,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.darkText,
  },
  addButton: {
    backgroundColor: Colors.primaryButton,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;