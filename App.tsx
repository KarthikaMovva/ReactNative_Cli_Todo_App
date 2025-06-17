import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store';
import { StatusBar } from 'react-native';
import StackNavigator from './src/Navigation/StackNavigator';
import GlobalWarning from './src/Components/GlobalWarning';
import { StateProvider } from './src/Auth/UseContext'; 

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StateProvider>
          <>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
            <GlobalWarning /> 
          </>
        </StateProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
