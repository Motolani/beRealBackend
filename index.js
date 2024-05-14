/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'; // Import Firebase app module

const Main = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

// Register the main component
AppRegistry.registerComponent(appName, () => Main);

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyBBElA7dCLbP-41wwmxUIZOKBxQgouXAds',
    authDomain: 'darkhorse001.firebaseapp.com',
    projectId: 'darkhorse001',
    storageBucket: 'darkhorse001.appspot.com',
    messagingSenderId: '749698494300',
    appId: '1:749698494300:ios:6aa5cadced77770aee5b99'
};

if (!firebase.apps.length) { // Check if Firebase app is already initialized
  firebase.initializeApp(firebaseConfig);
}

// Handle background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message handled:', remoteMessage);
});

// Handle foreground messages
messaging().onMessage(remoteMessage => {
  console.log('Foreground message:', remoteMessage);
  // Display the notification to the user
});

// Handle notification interaction when the app is in the foreground
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('App opened by notification while in foreground:', remoteMessage);
});

// Handle notification interaction when the app is opened from a closed state
messaging().getInitialNotification().then(remoteMessage => {
  console.log('App opened by notification from closed state:', remoteMessage);
});
