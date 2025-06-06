import 'react-native-reanimated';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import { store, persistor } from './src/Redux/Store';
import { AuthProvider } from './src/Auth/AuthContext';
import StackNavigator from './src/Navigation/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
