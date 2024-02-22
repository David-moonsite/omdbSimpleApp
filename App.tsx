/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/slices/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { COLORS } from './src/utils/GlobalStyles';

let persistor = persistStore(store);

function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.background_screen} />
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={<View style={styles.container} />} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_screen,
  },
});

export default App;
