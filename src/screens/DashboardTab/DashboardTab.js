import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Dashboard from './Dashboard/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import ContactGroups from './ContactGroups/ContactGroups';
import Settings from './Settings/Settings';

const DashboardTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="ContactGroups" 
        component={ContactGroups} 
        options={{
          tabBarLabel:'Groups',   
          tabBarStyle: { backgroundColor: '#e2f0fd' },   
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="people-sharp" size={28} color="#4772E1" />
          ),
        }}/>
        <Tab.Screen 
        name="Home" 
        component={Dashboard} 
        options={{
          tabBarLabel:'Home',   
          tabBarStyle: { backgroundColor: '#e2f0fd' },   
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="ios-home" size={32} color="#4772E1" />
          ),
        }}/>
        <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          tabBarLabel:'Settings',   
          tabBarStyle: { backgroundColor: '#e2f0fd' },   
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="settings-sharp" size={28} color="#4772E1" />
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default DashboardTab