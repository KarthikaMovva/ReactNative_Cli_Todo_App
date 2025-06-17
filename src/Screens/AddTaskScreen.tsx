import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StatusPicker from '../Components/StatusPicker';
import CustomButton from '../Components/CustomButton';
import CustomInput from '../Components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../Redux/TaskSlice';
import { RootState } from '../Redux/store';
import Colors from '../Utilities/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation';
import { useNavigation } from '@react-navigation/native';
import { useContextvalues } from '../Auth/UseContext';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const currentUserEmail = useSelector((state: RootState) => state.users.currentUser);
  const { setshowWarning, setwarningMessage, setIsConfirm } = useContextvalues();
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  

  const handleAdd = () => {
    if (title.trim() && currentUserEmail) {
      dispatch(addTask({ title, description: description.trim() ? description : 'No description', status }));
      navigation.goBack();
      setTitle("")
      setDescription("")
      setStatus('pending')
    }
    else if (!title || !description || !status) {
      setwarningMessage('Please fill in all fields before posting.');
      setIsConfirm(false);
      setshowWarning(true);
      return;
    }
    else if (!currentUserEmail) {
      setwarningMessage('You must be logged in to post a task.');
      setIsConfirm(false);
      setshowWarning(true);
      return;
    }

  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <CustomInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <StatusPicker
        selectedValue={status}
        onValueChange={setStatus}
      />
      <CustomButton text="Add Task" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  }
});

export default AddTaskScreen;