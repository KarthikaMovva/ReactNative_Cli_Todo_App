import React from 'react';
import { Text, FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task } from '../Type/types';
import Colors, { getStatusColor } from '../Utilities/Colors';

interface Props {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
  onDeletePress: (task: Task) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onTaskPress, onDeletePress }) => {
  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[styles.taskItem, { backgroundColor: getStatusColor(item.status) }]}
      onPress={() => onTaskPress(item)}
      activeOpacity={0.8}
    >
      <View>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskStatus}>Status: {item.status}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => onDeletePress(item)}
      >
        <Icon name="delete" size={25} color={Colors.deleteIconColor} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={styles.emptyText}>No tasks found.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: Colors.darkText,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  taskDescription: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.darkText,
  },
  taskStatus: {
    marginTop: 5,
    fontSize: 13,
    color: Colors.mediumText,
  },
  deleteIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    padding: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.lightText,
  },
});

export default TaskList;