import React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../Type/types';
import { getStatusColor } from '../Utilities/getStatusColor'; 

interface Props {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onTaskPress }) => {
  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[styles.taskItem, { backgroundColor: getStatusColor(item.status) }]}
      onPress={() => onTaskPress(item)}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <Text style={styles.taskStatus}>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No tasks found.</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  taskStatus: {
    marginTop: 5,
    fontSize: 13,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#aaa',
  },
});

export default TaskList;
