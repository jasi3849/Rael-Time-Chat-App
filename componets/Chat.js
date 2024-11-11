// // // import { StyleSheet, Text, View, Pressable, Image } from "react-native";
// // // import React, { useContext, useState } from "react";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { AuthContext } from "../AuthContext";

// // // const Chat = ({ item }) => {
// // //   const navigation = useNavigation();
// // //   const { userId } = useContext(AuthContext);
// // //   const [message, setMessage] = useState([]);

// // //   return (
// // //     <Pressable
// // //       onPress={() =>
// // //         navigation.navigate("ChatRoom", {
// // //           name: item?.name,
// // //           receiverId: item?._id,
// // //           image: item?.image
// // //         })
// // //       }
// // //       style={{ marginVertical: 15 }}
// // //     >
// // //       <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
// // //         <Pressable>
// // //           <Image
// // //             source={
// // //               require("../assets/profile.jpg") // Adjust the path based on your folder structure
// // //             }
// // //             style={{ width: 40, height: 40, borderRadius: 20 }}
// // //           />
// // //         </Pressable>
// // //         <View>
// // //           <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
// // //           <Text style={{ marginTop: 4, color: "gray" }}>
// // //             chat with {item?.name}
// // //           </Text>
// // //         </View>
// // //       </View>
// // //     </Pressable>
// // //   );
// // // };

// // // export default Chat;

// // // const styles = StyleSheet.create({});
// // import { StyleSheet, Text, View, Pressable, Image } from "react-native";
// // import React, { useContext, useEffect, useState } from "react";
// // import { useNavigation } from "@react-navigation/native";
// // import axios from "axios";
// // import { AuthContext } from "../AuthContext";

// // const Chat = ({ item }) => {
// //   const navigation = useNavigation();
// //   const { userId } = useContext(AuthContext);
// //   const [latestMessage, setLatestMessage] = useState("");

// //   // Fetch the latest message when the component mounts
// //   useEffect(() => {
// //     const fetchLatestMessage = async () => {
// //       try {
// //         const response = await axios.get("http://192.168.1.8:4000/latestMessage", {
// //           params: { senderId: userId, receiverId: item._id },
// //         });
// //         if (response.data?.message) {
// //           setLatestMessage(response.data.message);
// //         } else {
// //           setLatestMessage("No messages yet");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching latest message:", error);
// //       }
// //     };

// //     fetchLatestMessage();
// //   }, [userId, item._id]);

// //   return (
// //     <Pressable
// //       onPress={() =>
// //         navigation.navigate("ChatRoom", {
// //           name: item?.name,
// //           receiverId: item?._id,
// //           image: item?.image
// //         })
// //       }
// //       style={{ marginVertical: 15 }}
// //     >
// //       <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
// //         <Pressable>
// //           <Image
// //             source={require("../assets/profile.jpg")} // Adjust the path based on your folder structure
// //             style={{ width: 40, height: 40, borderRadius: 20 }}
// //           />
// //         </Pressable>
// //         <View>
// //           <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
// //           <Text style={{ marginTop: 4, color: "gray" }}>
// //             {latestMessage || `chat with ${item?.name}`}
// //           </Text>
// //         </View>
// //       </View>
// //     </Pressable>
// //   );
// // };

// // export default Chat;

// // const styles = StyleSheet.create({});
// import { useContext, useEffect, useState } from 'react';
// import { Text, View, Pressable, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from "../AuthContext";
// import { useSocketContext } from '../SocketContext';

// const Chat = ({ item }) => {
//   const navigation = useNavigation();
//   const { userId } = useContext(AuthContext);
//   const { socket } = useSocketContext();
//   const [latestMessage, setLatestMessage] = useState("");

//   useEffect(() => {
//     const fetchLatestMessage = async () => {
//       try {
//         const response = await axios.get("http://192.168.1.8:4000/latestMessage", {
//           params: { senderId: userId, receiverId: item._id },
//         });
//         if (response.data) {
//           setLatestMessage(response.data.message || "No messages yet");
//         }
//       } catch (error) {
//         console.error("Error fetching latest message:", error);
//       }
//     };

//     fetchLatestMessage();

//     // Update latest message in real time
//     const handleNewMessage = (newMessage) => {
//       if (
//         (newMessage.senderId === userId && newMessage.receiverId === item._id) ||
//         (newMessage.senderId === item._id && newMessage.receiverId === userId)
//       ) {
//         setLatestMessage(newMessage.message);
//       }
//     };

//     socket.on('receiveMessage', handleNewMessage);

//     return () => {
//       socket.off('receiveMessage', handleNewMessage);
//     };
//   }, [socket, userId, item._id]);

//   return (
//     <Pressable
//       onPress={() =>
//         navigation.navigate("ChatRoom", {
//           name: item?.name,
//           receiverId: item?._id,
//         })
//       }
//       style={{ marginVertical: 15 }}
//     >
//       <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//         <Image
//           source={require("../assets/profile.jpg")}
//           style={{ width: 40, height: 40, borderRadius: 20 }}
//         />
//         <View>
//           <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
//           <Text style={{ marginTop: 4, color: "gray" }}>
//             {latestMessage || `Chat with ${item?.name}`}
//           </Text>
//         </View>
//       </View>
//     </Pressable>
//   );
// };

// export default Chat;
import { useContext, useEffect, useState } from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../AuthContext";
import { useSocketContext } from '../SocketContext';
import axios from 'axios';

const Chat = ({ item }) => {
  const navigation = useNavigation();
  const { userId } = useContext(AuthContext);
  const { socket } = useSocketContext();
  const [latestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    // Function to fetch the latest message when the component mounts
    const fetchLatestMessage = async () => {
      try {
        const response = await axios.get("http://192.168.1.8:4000/latestMessage", {
          params: { senderId: userId, receiverId: item._id },
        });
        if (response.data) {
          setLatestMessage(response.data.message || "No messages yet");
        }
      } catch (error) {
        console.error("Error fetching latest message:", error);
      }
    };

    fetchLatestMessage();

    // Socket listener to update the latest message in real time
    const handleNewMessage = (data) => {
      if (
        (data.latestMessage.senderId === userId && data.latestMessage.receiverId === item._id) ||
        (data.latestMessage.senderId === item._id && data.latestMessage.receiverId === userId)
      ) {
        setLatestMessage(data.latestMessage.message);
      }
    };

    socket.on("latestMessage", handleNewMessage);

    return () => {
      socket.off("latestMessage", handleNewMessage);
    };
  }, [socket, userId, item._id]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatRoom", {
          name: item?.name,
          receiverId: item?._id,
        })
      }
      style={{ marginVertical: 15 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={require("../assets/profile.jpg")}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
          <Text style={{ marginTop: 4, color: "gray" }}>
            {latestMessage || `Chat with ${item?.name}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Chat;