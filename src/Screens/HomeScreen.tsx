import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../Redux/store';
import { updateTask, deleteTask } from '../Redux/TaskSlice';
import { Task } from '../Type/types';
import { useAuth } from '../Auth/authContext';
import Colors from '../Utilities/Colors';

import SearchBar from '../Components/SearchBar';
import TaskList from '../Components/TaskList';
import WarningModal from '../Components/WarningModal';
import EditTaskModal from '../Components/EditTaskModal';

const TASKS_PER_PAGE = 7;

const HomeScreen: React.FC = () => {
  const allTasks = useSelector((state: RootState) => state.tasks.value);
  const dispatch = useDispatch();
  const { currentUserEmail } = useAuth();

  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showUnchangedConfirm, setShowUnchangedConfirm] = useState(false);
  const [originalTask, setOriginalTask] = useState<null | Task>(null);
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<null | Task>(null);
  const [visibleTasks, setVisibleTasks] = useState<Task[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const filteredTasks = useMemo(() => {
    const userTasks = allTasks.filter(task => task.userEmail === currentUserEmail);
    return userTasks.filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [allTasks, currentUserEmail, search]);

  useEffect(() => {

    const newVisibleTasks = filteredTasks.slice(0, currentIndex * TASKS_PER_PAGE);
    setVisibleTasks(newVisibleTasks);
  }, [filteredTasks, currentIndex]);

  useEffect(() => {
    setCurrentIndex(1);
  }, [search]);


  const loadMoreTasks = () => {
    if (visibleTasks.length < filteredTasks.length) {
      const nextIndex = currentIndex + 1;
      const newTasks = filteredTasks.slice(0, nextIndex * TASKS_PER_PAGE);
      setVisibleTasks(newTasks);
      setCurrentIndex(nextIndex);
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

    const taskExists = allTasks.some(
      task => task.id === selectedTask.id && task.userEmail === currentUserEmail
    );
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
          tasks={visibleTasks}
          onTaskPress={handleTaskList}
          onDeletePress={task => {
            setTaskToDelete(task);
            setShowDeleteConfirm(true);
          }}
          onEndReached={loadMoreTasks}
        />
      </View>

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
  contentContainer: {
    flex: 1,
    paddingTop: 40,
  }
});

export default HomeScreen;