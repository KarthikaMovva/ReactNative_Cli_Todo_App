import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import StatusPicker from '../Components/StatusPicker';
import WarningModal from '../Components/WarningModal';
import SearchBar from '../Components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { updateTask } from '../Redux/TaskSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Task } from '../Type/types';
import TaskList from '../Components/TaskList';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const tasks = useSelector((state: RootState) => state.tasks.value);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showUnchangedConfirm, setShowUnchangedConfirm] = useState(false);
  const [originalTask, setOriginalTask] = useState<null | Task>(null);
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);


  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
const handleUpdate = () => {
  if (!selectedTask || !originalTask) return;

  const isUnchanged =
    selectedTask.title === originalTask.title &&
    selectedTask.description === originalTask.description &&
    selectedTask.status === originalTask.status;

  if (isUnchanged) {
    setShowUnchangedConfirm(true); 
    return;
  }

  const taskExists = tasks.some(task => task.id === selectedTask.id);
  if (!taskExists) {
    setErrorMessage('Task not found. The ID did not match');
    setShowErrorModal(true);
    return;
  }

  dispatch(updateTask(selectedTask));
  setModalVisible(false);
};



  return (
    <View style={styles.container}>
<WarningModal
  visible={showUnchangedConfirm}
  message="No changes made. Do you still want to update the task?"
  onClose={() => setShowUnchangedConfirm(false)}
  onConfirm={() => {
    dispatch(updateTask(selectedTask!));
    setShowUnchangedConfirm(false);
    setModalVisible(false);
  }}
/>
<WarningModal
  visible={showErrorModal}
  message={errorMessage}
  onClose={() => setShowErrorModal(false)}
  onConfirm={() => setShowErrorModal(false)}
/>


      <SearchBar value={search} onChangeText={setSearch} placeholder="Search tasks..." />
      <TaskList
        tasks={filteredTasks}
        onTaskPress={(task) => {
          console.log('modalVisible1', modalVisible);
          setSelectedTask({ ...task });
          setOriginalTask({ ...task });
          setModalVisible(true);
          console.log('modalVisible2', modalVisible);

        }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={selectedTask?.title || ''}
            onChangeText={text =>
              setSelectedTask(prev => prev ? { ...prev, title: text } : null)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={selectedTask?.description || ''}
            onChangeText={text =>
              setSelectedTask(prev => prev ? { ...prev, description: text } : null)
            }
          />

          <StatusPicker
            selectedValue={selectedTask?.status || ''}
            onValueChange={(value) =>
              setSelectedTask(prev => prev ? { ...prev, status: value } : null)
            }
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
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
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
