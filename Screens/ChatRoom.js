import React, { useContext, useEffect, useLayoutEffect, useState,useRef } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSocketContext } from '../SocketContext';
import { ScrollView, Text, TextInput, View, Pressable, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { userId } = useContext(AuthContext);
  const { socket } = useSocketContext();
  const navigation = useNavigation();
  const route = useRoute();
  const scrollViewRef = useRef(null); // Ref for ScrollView
  const receiverId = route?.params?.receiverId;
  const receiverName = route?.params?.name;
  const hasFetchedMessages = useRef(false);
  // Set the recipient's name in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: receiverName || 'Chat Room',
    });
  }, [navigation, receiverName]);

 // Fetch messages only once when the component mounts
 useEffect(() => {
  const fetchMessages = async () => {
    if (hasFetchedMessages.current) return; // Prevent re-fetching
    try {
      const response = await axios.get("http://192.168.1.8:4000/messages", {
        params: { senderId: userId, receiverId },
      });
      console.log("Fetched Messages:", response.data); 

      setMessages(response.data.map(msg => ({
        ...msg,
        senderId: typeof msg.senderId === 'object' ? msg.senderId._id : msg.senderId,
        receiverId: msg.receiverId,
      })));
      hasFetchedMessages.current = true; // Mark as fetched
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchMessages();
}, [userId, receiverId]);


// useEffect(() => {
//   const handleReceiveMessage = (newMessage) => {
//     console.log("Received new message:", newMessage);

//     // Check if the message already exists in the messages list
//     const messageExists = messages.some(
//       (msg) =>
//         msg.senderId === newMessage.senderId &&
//         msg.message === newMessage.message &&
//         msg.timeStamp === newMessage.timeStamp
       
//     );

//     if (!messageExists) {
//       console.log("New unique message, adding to messages list.");
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     } else {
//       console.log("Duplicate message detected, not adding.");
//     }
//   };

//   if (socket) {
//     socket.on('receiveMessage', handleReceiveMessage);
//   }

//   return () => {
//     if (socket) {
//       console.log("Cleaning up socket event listener.");
//       socket.off('receiveMessage', handleReceiveMessage);
//     }
//   };
// }, [socket, messages]);


useEffect(() => {
  const handleReceiveMessage = (newMessage) => {
    console.log("Received new message:", newMessage);

    // Check if timestamp is valid
    const isValidTimeStamp = !isNaN(new Date(newMessage.timeStamp).getTime());

    // Check if the message already exists in the messages list
    const messageExists = messages.some(
      (msg) =>
        msg.senderId === newMessage.senderId &&
        msg.receiverId === newMessage.receiverId &&
        msg.message === newMessage.message &&
        msg.timeStamp === newMessage.timeStamp
    );

    if (isValidTimeStamp && !messageExists) {
      console.log("New unique message with valid timestamp, adding to messages list.");
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } else if (!isValidTimeStamp) {
      console.log("Message with invalid timestamp detected, not adding.");
    } else {
      console.log("Duplicate message detected, not adding.");
    }
  };

  if (socket) {
    socket.on('receiveMessage', handleReceiveMessage);
  }

  return () => {
    if (socket) {
      console.log("Cleaning up socket event listener.");
      socket.off('receiveMessage', handleReceiveMessage);
    }
  };
}, [socket, messages]);










////////////////////////////////////////////////////////////////////////////





/// for scrolling to the latest message 
useEffect(() => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollToEnd({ animated: true }); // Scroll to the end
  }
}, [messages]); // Run this effect whenever messages update


///////////////////

  // Send message
  const sendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = {
      senderId: userId,
      receiverId,
      message,
      timeStamp: new Date().toISOString(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]); // Show the message immediately

    try {
      await axios.post("http://192.168.1.8:4000/sendMessage", newMessage);
      socket.emit('sendMessage', newMessage);
      setMessage(''); // Clear the input
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  


  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView 
      ref={scrollViewRef} // Attach ref to ScrollView
      contentContainerStyle={{ padding: 10 }}>
  {messages.map((msg, index) => {
    // Debug logs to check values
    console.log(
      "Sender ID:", msg.senderId,
      "Receiver ID:", receiverId,
      "Message:", msg.message,
      "Timestamp:", new Date(msg.timeStamp).toLocaleString() // format date and time
    );

    return (
      <View
        key={index}
        style={{
          alignSelf: msg.senderId === userId ? 'flex-end' : 'flex-start',
          backgroundColor: msg.senderId === userId ? '#DCF8C6' : '#FFF',
          padding: 10,
          marginVertical: 5,
          borderRadius: 10,
          maxWidth: '70%',
        }}
      >
        <Text>{msg.message}</Text>
        <Text style={{ fontSize: 10, color: 'gray', textAlign: 'right', marginTop: 5 }}>
          {new Date(msg.timeStamp).toLocaleTimeString()}
        </Text>
      </View>
    );
  })}
</ScrollView>


      <View style={{ flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#ddd' }}>
        <TextInput
          style={{ flex: 1, borderColor: '#ddd', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10 }}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <Pressable
          onPress={sendMessage}
          style={{ backgroundColor: '#0066b2', padding: 10, borderRadius: 20, marginLeft: 8 }}
        >
          <Text style={{ color: 'white' }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
// // // /// typing not working uncomment end
// // // ///////////////////////////////////////////
