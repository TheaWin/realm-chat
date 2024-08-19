import { useEffect, useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";

export default function Chat({ route, navigation }) {
  const [messages,setMessages] = useState([]);
  const { name, color } = route.params;
  
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  };

  const renderBubble = (props) => {
    return <Bubble
    {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        },
        left: {
          backgroundColor: '#fff'
        }
      }}
    />
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome to the Realm Chat',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'You\'ve entered the chat',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      { Platform.OS === 'android' || Platform.OS === 'ios' 
        ? <KeyboardAvoidingView behavior="height" />
        : null 
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})