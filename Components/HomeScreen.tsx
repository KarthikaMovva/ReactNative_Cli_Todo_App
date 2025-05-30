import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { updateTask } from '../Redux/TaskSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const tasks = useSelector((state: RootState) => state.tasks.value);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = () => {
    dispatch(updateTask(selectedTask));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search tasks..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => {
              setSelectedTask(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskStatus}>{item.status}</Text>
          </TouchableOpacity>
        )}
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
            value={selectedTask?.title}
            onChangeText={text =>
              setSelectedTask({ ...selectedTask, title: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={selectedTask?.description}
            onChangeText={text =>
              setSelectedTask({ ...selectedTask, description: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Status"
            value={selectedTask?.status}
            onChangeText={text =>
              setSelectedTask({ ...selectedTask, status: text })
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
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  taskStatus: {
    fontSize: 14,
    color: '#999',
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
