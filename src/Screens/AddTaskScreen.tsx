import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import StatusPicker from '../Components/StatusPicker';
import CustomButton from '../Components/CustomButton';
import CustomInput from '../Components/CustomInput';
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/TaskSlice';
import Colors from '../Utilities/Colors';
import WarningModal from '../Components/WarningModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation.Types';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Auth/AuthContext';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [warningVisible, setWarningVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentUserEmail } = useAuth();

  const handleAdd = () => {
    if (title.trim() && currentUserEmail) {
      dispatch(addTask({ title, description: description.trim() ? description : 'No description', status, userEmail: currentUserEmail }));
      navigation.goBack();
      console.log(currentUserEmail,"currentuserEmail");
      setTitle("")
      setDescription("")
      setStatus('pending')
    } else {
      setWarningVisible(true);
    }
  };

  const handleClose = () => {
    setWarningVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WarningModal
        visible={warningVisible}
        message="Please enter task Title, description and status to add."
        onClose={handleClose}
      />
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