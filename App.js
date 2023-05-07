import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState, useContext} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import DashboardTab from './src/screens/DashboardTab';
import Icon from 'react-native-vector-icons/Ionicons';
import CreateReminderTab from './src/screens/CreateReminderTab/CreateReminderTab';
import { AuthContext } from './src/context/AuthContext';
import CreateGroup from './src/screens/DashboardTab/ContactGroups/CreateGroup/CreateGroup';

const Stack = createNativeStackNavigator();
const App = ( navigation ) => {
  const { userToken } = useContext(AuthContext);
  
  return (
    <NavigationContainer style={styles.MainContainer}>
    <Stack.Navigator >
      <Stack.Screen options= { ({navigation}) => ({ headerStyle: { backgroundColor: '#e2f0fd', }, headerRight: () => (<TouchableOpacity onPress= {() => navigation.navigate("Set Reminder")}><Icon style={styles.SetReminder} name="alarm" size={32} color="#4772E1" /></TouchableOpacity> ), })} name="Dashboard" component={DashboardTab} />

      {/* {userToken ? <Stack.Screen options= { ({navigation}) => ({ headerStyle: { backgroundColor: '#e2f0fd', }, headerRight: () => (<TouchableOpacity onPress= {() => navigation.navigate("Set Reminder")}><Icon style={styles.SetReminder} name="alarm" size={32} color="#4772E1" /></TouchableOpacity> ), })} name="Dashboard" component={DashboardTab} /> : <Stack.Screen  options={{headerStyle: { backgroundColor: '#cae8f5', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.03)'} }} name="Log in" component={Login} />}   */}
      
      <Stack.Screen options={{ headerStyle: { backgroundColor: '#e2f0fd', } }} name="Register" component={Register} />
      
      <Stack.Screen options={{ headerStyle: { backgroundColor: '#e2f0fd', } }} name="Set Reminder" component={CreateReminderTab} />

      <Stack.Screen options={{ headerStyle: { backgroundColor: '#e2f0fd', } }} name="Create Group" component={CreateGroup} />
    </Stack.Navigator>
    
  </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  SetReminder:{
    marginRight: 25,
  },
  Background:{
    backgroundColor: '#e2f0fd'
  },
  MainContainer:{
    backgroundColor: '#e2f0fd'
  }
})

export default App