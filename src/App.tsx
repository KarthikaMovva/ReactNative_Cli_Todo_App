import 'react-native-reanimated';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { RootStackParamList } from './Type/types';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';
import { AuthProvider, useAuth } from './Auth/authContext';

import HomeScreen from './Screens/HomeScreen';
import AddTaskScreen from './Screens/AddTaskScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import SettingsScreen from './Screens/SettingsScreen';


import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const getTabBarIcon =
  (routeName: string) =>
  ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
    let iconName: string;

    switch (routeName) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Add Task':
        iconName = focused ? 'add-circle' : 'add-circle-outline';
        break;
      case 'Settings':
        iconName = focused ? 'settings' : 'settings-outline';
        break;
      default:
        iconName = 'help-circle-outline'; 
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: getTabBarIcon(route.name),
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Add Task" component={AddTaskScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);
const CustomDrawerContent = (props: any) => {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          logout();
        }}
      />
    </DrawerContentScrollView>
  );
};


const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="Tabs" component={Tabs} />
  </Drawer.Navigator>
);

const MainNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
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

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;