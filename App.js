import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//all screens
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{
          headerStyle: {
            backgroundColor: "#0f4c75"
          },
          title: 'My Doctor App',
          headerTitleStyle: {
            textAlign: "center",
            color: "#00b7c2"
          }
        }} />
        <Stack.Screen name="Add" component={Add} options={{
          headerStyle: {
            backgroundColor: "#0f4c75"
          },
          title: 'My Doctor App',
          headerTitleStyle: {
            textAlign: "center",
            color: "#00b7c2"
          }
        }} />
        <Stack.Screen name="Edit" component={Edit} options={{
          headerStyle: {
            backgroundColor: "#0f4c75"
          },
          title: 'My Doctor App',
          headerTitleStyle: {
            textAlign: "center",
            color: "#00b7c2"
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
