import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default function CustomActions({ wrapperStyle, iconTextStyle, onSend, storage, userID }) {
  const [image, setImage] = useState(null);

  const uploadAndSendImage = async(imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async(snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  const pickImage = async() => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const takePhoto = async() => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
  
      if (!result.canceled) {
        console.log('Uploading the image occurs here');
  
        await uploadAndSendImage(result.assets[0].uri);
        
        // save the picture taken to the device
        let mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
        if (mediaLibraryPermissions?.granted) {
          await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
        }
        setImage(result.assets[0]);
      } else {
        Alert.alert('Image capturing was canceled.');
      }
    } else {
      Alert.alert("Camera permissions haven't been granted.");
    }
  };

  const getLocation = async() => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split('/')[uri.split('/').length -1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      'Select an image from library',
      'Take a photo',
      'Share Location',
      'Cancel'
    ];
    const cancelButtonIndex = options.length -1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async(buttonIndex) => {
        switch (buttonIndex) {
        case 0:
          pickImage();
          return;
        case 1: 
          takePhoto();
          return;
        case 2: 
          getLocation();
        default:
        }
      },
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
    >
      {/* wrapperStyle and iconTextStyle are props */}
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 26,
    width: 26,
    marginBottom: 10,
    marginLeft: 10,
  },
  wrapper: {
    borderColor: '#b2b2b2',
    borderRadius: 13,
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    backgroundColor: 'transparent',
    color: '#b2b2b2',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 1,
    textAlign: 'center',
  },
});