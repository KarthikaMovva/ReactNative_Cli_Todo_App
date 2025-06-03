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
import { updateTask, deleteTask } from '../Redux/TaskSlice';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Utilities/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Task } from '../Type/types';
import { useAuth } from '../Auth/authContext';
import TaskList from '../Components/TaskList';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const allTasks = useSelector((state: RootState) => state.tasks.value);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showUnchangedConfirm, setShowUnchangedConfirm] = useState(false);
  const [originalTask, setOriginalTask] = useState<null | Task>(null);
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<null | Task>(null);
  const { setIsLoggedIn, currentUserEmail } = useAuth();

  const userTasks = allTasks.filter(task => task.userEmail === currentUserEmail);

  const filteredTasks = userTasks.filter(task =>
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

    const taskExists = allTasks.some(task => task.id === selectedTask.id && task.userEmail === currentUserEmail);
    if (!taskExists) {
      setErrorMessage('Task not found or you do not have permission to update it.');
      setShowErrorModal(true);
      return;
    }

    dispatch(updateTask(selectedTask));
    setModalVisible(false);
  };

  const handleClose = () => {
    setShowUnchangedConfirm(false)
  };

  const errHandleClose = () => {
    setShowErrorModal(false);
  }

  const errHandleConfrim = () => {
    setShowErrorModal(false);
  }

  const handleTaskList = (task: Task) => {
    setSelectedTask({ ...task });
    setOriginalTask({ ...task });
    setModalVisible(true);
  }

  const handleDeletePress = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (taskToDelete && taskToDelete.userEmail === currentUserEmail) {
      dispatch(deleteTask(taskToDelete.id));
      setShowDeleteConfirm(false);
      setTaskToDelete(null);
    } else {
      setErrorMessage('You do not have permission to delete this task.');
      setShowErrorModal(true);
      setShowDeleteConfirm(false);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  return (
    <View style={styles.container}>
      <WarningModal
        visible={showUnchangedConfirm}
        message="No changes made. Do you still want to update the task?"
        onClose={handleClose}
        onConfirm={() => {
          if (selectedTask) {
            dispatch(updateTask(selectedTask));
          }
          setShowUnchangedConfirm(false);
          setModalVisible(false);
        }}
      />
      <WarningModal
        visible={showErrorModal}
        message={errorMessage}
        onClose={errHandleClose}
        onConfirm={errHandleConfrim}
      />
      <WarningModal
        visible={showDeleteConfirm}
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search tasks..." />
        <TaskList
          tasks={filteredTasks}
          onTaskPress={handleTaskList}
          onDeletePress={handleDeletePress}
        />
      </View>


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
            placeholderTextColor={Colors.mediumText}
            value={selectedTask?.title || ''}
            onChangeText={text =>
              setSelectedTask(prev => prev ? { ...prev, title: text } : null)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor={Colors.mediumText}
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
    backgroundColor: Colors.lightGray,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
  },
  logoutButtonText: {
    color: Colors.dangerButton,
    fontWeight: 'bold',
  },

  contentContainer: {
    flex: 1,
    paddingTop: 40,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: Colors.primaryButton,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.darkText,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: Colors.primaryButtonText,
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
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
  saveButton: {
    backgroundColor: Colors.saveButton,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.primaryButtonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;