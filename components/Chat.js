import { useEffect, useState } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chat({ route, navigation, db, isConnected }) {
  const [messages,setMessages] = useState([]);
  const { userID, name, color } = route.params;
  
  const onSend = (newMessages) => {
    // setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    addDoc(collection(db, 'messages'), newMessages[0])
  };

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const renderInputToolbar = (props) => {
    if(isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  let unsubMessages;
  useEffect(() => {
    if (isConnected === true) {

      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(
        collection(db, 'messages'),
        orderBy('createdAt', 'desc')
      );
      unsubMessages = onSnapshot(
        q,(documentsSnapshot) => {
          let newMessages = [];
          documentsSnapshot.forEach(doc => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            });
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        }
      );
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const cacheMessages = async(messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

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
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
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