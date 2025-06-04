import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootState } from '../Redux/store';
import { updateTask, deleteTask } from '../Redux/TaskSlice';
import { RootStackParamList } from '../App';
import { Task } from '../Type/types';
import { useAuth } from '../Auth/authContext';
import Colors from '../Utilities/Colors';

import SearchBar from '../Components/SearchBar';
import TaskList from '../Components/TaskList';
import WarningModal from '../Components/WarningModal';
import Pagination from '../Components/Pagination';
import EditTaskModal from '../Components/EditTaskModal';

const TASKS_PER_PAGE = 7;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const allTasks = useSelector((state: RootState) => state.tasks.value);
  const dispatch = useDispatch();

  const { setIsLoggedIn, currentUserEmail } = useAuth();

  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showUnchangedConfirm, setShowUnchangedConfirm] = useState(false);
  const [originalTask, setOriginalTask] = useState<null | Task>(null);
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<null | Task>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const userTasks = allTasks.filter(task => task.userEmail === currentUserEmail);
  const filteredTasks = userTasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
  const newTotalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  if (currentPage > newTotalPages && newTotalPages > 0) {
    setCurrentPage(newTotalPages);
  } else if (newTotalPages === 0) {
    setCurrentPage(1);
  }
}, [filteredTasks.length, currentPage]);

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * TASKS_PER_PAGE,
    currentPage * TASKS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTaskList = (task: Task) => {
    setSelectedTask({ ...task });
    setOriginalTask({ ...task });
    setModalVisible(true);
  };




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

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
    setOriginalTask(null);
  };


  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.logoutButton} onPress={() => setIsLoggedIn(false)}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <WarningModal
        visible={showUnchangedConfirm}
        message="No changes made. Do you still want to update the task?"
        onClose={() => setShowUnchangedConfirm(false)}
        onConfirm={() => {
          if (selectedTask) dispatch(updateTask(selectedTask));
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
      <WarningModal
        visible={showDeleteConfirm}
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
      />
      <View style={styles.contentContainer}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search tasks..." />
        <TaskList
          tasks={paginatedTasks}
          onTaskPress={handleTaskList}
          onDeletePress={task => {
            setTaskToDelete(task);
            setShowDeleteConfirm(true);
          }}
        />
      </View>
      {filteredTasks.length > TASKS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <EditTaskModal
        visible={modalVisible}
        task={selectedTask}
        onClose={handleCloseModal}
        onChange={setSelectedTask}
        onSave={handleUpdate}
      />

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
    color: Colors.background,
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default HomeScreen;
