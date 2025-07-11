
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './components/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LiveFeedScreen from './components/screens/LiveFeedScreen';
import CartScreen from './components/screens/CartScreen';

const Drawer = createDrawerNavigator();
const MyDrawer = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Cart">
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Live Feed" component={LiveFeedScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
)

export default function MyApp () {
  return(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MyDrawer/>
    </PersistGate>
  </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
})
