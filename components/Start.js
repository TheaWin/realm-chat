import { useState } from "react";
import { StyleSheet, View, Text, Alert, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const image = require('../assets/Background Image.png');

export default function Start({ navigation }) {
  const auth = getAuth();

  const [username, setUsername] = useState('');
  const [background, setBackground] = useState('');
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name: username,
          color: background
        });
        Alert.alert('Signed in Successfully');
      })
      .catch(() => {
        Alert.alert('Unable to sign in, try again later.');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        {/* app title */}
        <Text style={styles.appTitle}>Realm Chat</Text>
        
        {/* container for input, color choice and button */}
        <View style={styles.context}>
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText = {setUsername}
            placeholder='Your Name'
          />
          <Text style={styles.colorText}>Choose Background Color:</Text>
          {/* user selects bg color */}
          <View style={styles.colorButtonContainer}>
            {/* Loop through the colors array and create a button for each color */}
            {colors.map((color, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.colorButton,{ backgroundColor: color },
                  background === color && styles.selectedColor
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  context: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '44%',
    justifyContent: 'space-around',
    margin: 25,
    width: '88%'
  },
  appTitle: {
    color: '#FFF',
    flex: 1,
    fontSize: 45,
    fontWeight: '600',
    margin: 50
  },
  textInput: {
    borderWidth: 1,
    color: ' #757083',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 15,
    opacity: 50,
    padding: 15,
    width: '88%',
  },
  colorText: {
    alignSelf: 'flex-start',
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    marginLeft: '6%',
    opacity: 100

  },
  colorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: '6%'
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5
  },
  selectedColor:{
    borderColor: '#c0c0c0',
    borderWidth: 3
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#757083',
    borderRadius: 4,
    height: '20%',
    justifyContent: 'center',
    padding: 10,
    width: '88%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});