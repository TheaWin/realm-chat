import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Chat({ route, navigation }) {

const { name, color } = route.params;
  
  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.text}>Hello! Let's start chatting</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff'
  }
})