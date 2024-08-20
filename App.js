import { initializeApp } from 'firebase/app';
import { disableNetwork, enableNetwork, getFirestore } from 'firebase/firestore';
// import { StyleSheet} from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

const Stack = createNativeStackNavigator();

export default function App() {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if(connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if(connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyBbaplOD27yepOzDJ9y8-Jif7s7y0AimPA",
    authDomain: "realm-chat-dbe0b.firebaseapp.com",
    projectId: "realm-chat-dbe0b",
    storageBucket: "realm-chat-dbe0b.appspot.com",
    messagingSenderId: "278230793866",
    appId: "1:278230793866:web:987a2c9a81683fa4aa3773"
  };

  //initialize firebase
  const app = initializeApp(firebaseConfig);

  //Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });
