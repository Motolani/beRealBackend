/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AuthProvider } from './src/context/AuthContext';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';




AppRegistry.registerComponent(appName, () => () => (

    <AuthProvider>
    
    <App></App>
    
    </AuthProvider>
    
), () => App );

// // Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyBBElA7dCLbP-41wwmxUIZOKBxQgouXAds',
    authDomain: 'darkhorse001.firebaseapp.com',
    projectId: 'darkhorse001',
    storageBucket: 'darkhorse001.appspot.com',
    messagingSenderId: '749698494300',
    appId: '1:749698494300:ios:6aa5cadced77770aee5b99'
};

firebase.initializeApp(firebaseConfig);

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message handled:', remoteMessage);
});

messaging().onMessage(remoteMessage => {
    console.log('Foreground message:', remoteMessage);
    // Display the notification to the user
});
messaging().onNotificationOpenedApp(remoteMessage => {
console.log('App opened by notification while in foreground:', remoteMessage);
// Handle notification interaction when the app is in the foreground
});
messaging().getInitialNotification().then(remoteMessage => {
console.log('App opened by notification from closed state:', remoteMessage);
// Handle notification interaction when the app is opened from a closed state
});

// PushNotification.configure({
//     onRegister: function (token) {
//         console.log('TOKEN: ', token)
//     },

//     onNotification: function (notification) {
//         console.log('NOTIFICATION: ', notification)
//         notification.finish(PushNotification.FetchResult.NoData);
//     },

//     channelId: '1',

//     permissions:{
//         alert: true,
//         badge: true,
//         sound: true,
//     },

//     popInitialNotification: true,
// })

// async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
// } 
  
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });
  
//   requestUserPermission();

//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('Received a new message:', remoteMessage);
//     });
  
//     return unsubscribe;
//   }, []);

  

