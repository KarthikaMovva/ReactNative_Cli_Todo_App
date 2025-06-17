import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import DrawerNavigator from './DrawerNavigator'; 
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../Types/Navigation';
import { RootState } from '../Redux/Store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const currentUser = useSelector((state: RootState) => state.users.currentUser);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser ? (
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
