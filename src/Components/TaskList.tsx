import React from 'react';
import { Text, FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TaskListProps } from '../Types/Props';
import { Task }  from '../Types/Redux';
import { AppColorsType } from '../Utilities/Colors';
import { getStatusColor } from '../Utilities/Utilities';
import { useThemeContext } from '../Auth/ThemeContext';

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskPress, onDeletePress, onEndReached }) => {

  const { requiredColors } = useThemeContext();

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[styles(requiredColors).taskItem, { backgroundColor: getStatusColor(requiredColors,item.status) }]}
      onPress={() => onTaskPress(item)}
      activeOpacity={0.8}
    >
      <View>
        <Text style={styles(requiredColors).taskTitle}>{item.title}</Text>
        <Text style={styles(requiredColors).taskDescription}>{item.description}</Text>
        <Text style={styles(requiredColors).taskStatus}>Status: {item.status}</Text>
      </View>
      <TouchableOpacity
        style={styles(requiredColors).deleteIcon}
        onPress={() => onDeletePress(item)}
      >
        <Icon name="delete" size={25} color={requiredColors.darkText} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles(requiredColors).container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles(requiredColors).emptyText}>No tasks found.</Text>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tasks.length === 0 ? styles(requiredColors).emptyContainer : undefined}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};


const styles = (requiredColors:AppColorsType)=>StyleSheet.create({
  container:{
    flex : 1,
  },
  taskItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    position: 'relative',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: requiredColors.darkText,
  },
  taskDescription: {
    marginVertical: 5,
    fontSize: 14,
    color: requiredColors.darkText,
  },
  taskStatus: {
    marginVertical: 5,
    fontSize: 13,
    color: requiredColors.mediumText,
  },
  deleteIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    padding: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: 16,
    color: requiredColors.lightText,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default TaskList;
