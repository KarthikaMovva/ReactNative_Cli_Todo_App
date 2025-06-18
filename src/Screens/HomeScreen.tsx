import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../Redux/Store';
import { updateTask, deleteTask } from '../Redux/TaskSlice';
import { Task } from '../Types/Redux';
import { AppColorsType } from '../Utilities/Colors';
import { useContextValues } from '../Auth/ModalContext';
import { ThemeContext } from '../Auth/ThemeContext';

import SearchBar from '../Components/SearchBar';
import TaskList from '../Components/TaskList';
import EditTaskModal from '../Components/EditTaskModal';

const HomeScreen: React.FC = () => {
  const allTasks = useSelector((state: RootState) => state.tasks.value);
  const dispatch = useDispatch();
  const {
    setShowWarning,
    setWarningMessage,
    setIsConfirm,
    setOnConfirm,
  } = useContextValues();
  const { requiredColors } = ThemeContext();

  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [originalTask, setOriginalTask] = useState<null | Task>(null);
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const [visibleTasks, setVisibleTasks] = useState<Task[]>([]);

  const filteredTasks = useMemo(() => {
    return allTasks.filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [allTasks, search]);

useEffect(() => {
  setVisibleTasks(filteredTasks);
}, [filteredTasks]);

  const handleTaskList = (task: Task) => {
    setSelectedTask({ ...task });
    setOriginalTask({ ...task });
    setModalVisible(true);
  };

  const handleUpdate = () => {
    if (!selectedTask || !originalTask) { return; }

    const isUnchanged =
      selectedTask.title === originalTask.title &&
      selectedTask.description === originalTask.description &&
      selectedTask.status === originalTask.status;

    const taskExists = allTasks.some(
      task => task.id === selectedTask.id
    );

    if (!taskExists) {
      setWarningMessage('Task not found or you do not have permission to update it.');
      setShowWarning(true);
      return;
    }

    if (isUnchanged) {
      setWarningMessage('No values were changed. Do you still want to save?');
      setIsConfirm(true);
      setShowWarning(true);

      setOnConfirm(() => () => {
        dispatch(updateTask(selectedTask));
        setModalVisible(false);
        setShowWarning(false);
      });

      return;
    }
    dispatch(updateTask(selectedTask));
    setModalVisible(false);
  };


  const handleDeletePress = (task: Task) => {
    setWarningMessage(`Are you sure you want to delete "${task.title}"?`);
    setIsConfirm(true);
    setShowWarning(true);

    setOnConfirm(() => () => {
      dispatch(deleteTask(task.id));
      setShowWarning(false);
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
    setOriginalTask(null);
  };

  return (
    <View style={styles(requiredColors).container}>
      <View style={styles(requiredColors).contentContainer}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search tasks..." />
        <TaskList
          tasks={visibleTasks}
          onTaskPress={handleTaskList}
          onDeletePress={handleDeletePress}
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

const styles = (requiredColors:AppColorsType) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: requiredColors.background,
  },
  contentContainer: {
    flex: 1,
  },
});

export default HomeScreen;
