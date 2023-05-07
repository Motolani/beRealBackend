import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';
import SetReminder from './SetReminder/SetReminder';
import Ai from './OurAi/OurAi';

const CreateReminderTab = () => {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
           <Tab.Screen 
          name="Schedule" 
          component={SetReminder} 
          options={{
            // tabBarLabel:'Set', 
            tabBarStyle: { backgroundColor: '#e2f0fd' },
            tabBarIcon: ({focused, color, size}) => (
                <Icon name="alarm" size={30} color="#4772E1" />
            ),
          }}/>
          
        <Tab.Screen 
          name="AI Message Aid" 
          component={Ai} 
          options={{
            tabBarStyle: { backgroundColor: '#e2f0fd' },   
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="ios-chatbox-ellipses" size={30} color="#4772E1" />
            ),
          }}/>
      </Tab.Navigator>
  )
}

export default CreateReminderTab