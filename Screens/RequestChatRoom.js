// import {
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   ScrollView,
//   TextInput,
//   Pressable,
// } from "react-native";
// import React, { useContext, useLayoutEffect, useState } from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { AuthContext } from "../AuthContext";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import Entypo from "@expo/vector-icons/Entypo";
// import axios from "axios";
// const RequestChatRoom = () => {
//   const navigation = useNavigation();
//   const [message, setMessage] = useState("");
//   const { token, userId, setToken, setUserId } = useContext(AuthContext);
//   const route = useRoute();
//   useLayoutEffect(() => {
//     return navigation.setOptions({
//       headerTitle: "",
//       headerLeft: () => (
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Ionicons
//             name="arrow-back-outline"
//             size={24}
//             color="black"
//             onPress={() => navigation.goBack()} // Makes the arrow functional
//           />
//           <View style={{ marginLeft: 10 }}>
//             <Text>{route?.params?.name || "Unknown"}</Text>
//           </View>
//         </View>
//       ),
//     });
//   });

//   const sendMessage = async () => {
//     try {
//         const userData = {
//             senderId:userId,
//             receiverId:route?.params?.receiverId,
//             message:message
//         };
//         const response = await axios.post("http://192.168.1.9:4000/sendrequest",userData)
//         if(response.status == 200){
//             setMessage("");
//             Alert.alert("Your Request has been shared , wait for the user to accept your request ")
//         }
//     } catch (error) {
//         console.log("error", error)
//     }
//   }
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1, backgroundColor: "white" }}
//       behavior="padding"
//     >
//       <ScrollView></ScrollView>
//       <View
//         style={{
//           backgroundColor: "white",
//           flexDirection: "row",
//           alignItems: "center",
//           paddingHorizontal: 10,
//           paddingVertical: 10,
//           borderTopWidth: 1,
//           borderTopColor: "#dddddd",
//           marginBottom: 20,
//         }}
//       >
//         <Entypo name="emoji-happy" size={24} color="black" />
//         <TextInput
//           value={message}
//           onChange={setMessage}
//           style={{
//             flex: 1,
//             height: 40,
//             borderWidth: 1,
//             borderColor: "gray",
//             borderRadius: 20,
//             paddingHorizontal: 10,
//             marginLeft:10,
//           }}
//           placeholder="Type your message..." 
//         />

//         <View>
//           <Pressable
//           onPress={sendMessage}
//             style={{
//               backgroundColor: "#007bff",
//               paddingVertical: 8,
//               paddingHorizontal: 12,
//               borderRadius: 20,
//               marginLeft: 10,
//             }}
//           >
//             <Text
//               style={{
//                 color: "white",
//                 fontWeight: "bold",
//               }}
//             >
//               Send
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default RequestChatRoom;

// const styles = StyleSheet.create({});
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Pressable,
    Alert
  } from "react-native";
  import React, { useContext, useLayoutEffect, useState } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { AuthContext } from "../AuthContext";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import Entypo from "@expo/vector-icons/Entypo";
  import axios from "axios";
  
  const RequestChatRoom = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState("");
    const { token, userId } = useContext(AuthContext);
    const route = useRoute();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "",
        headerLeft: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
            <View style={{ marginLeft: 10 }}>
              <Text>{route?.params?.name || "Unknown"}</Text>
            </View>
          </View>
        ),
      });
    }, [navigation, route?.params?.name]);
  
    const sendMessage = async () => {
      try {
        const userData = {
          senderId: userId,
          receiverId: route?.params?.receiverId,
          message: message,
        };
  
        // Logging userData to check for any potential circular structure
        console.log("UserData to be sent:", JSON.stringify(userData, null, 2));
  
        const response = await axios.post("http://192.168.1.8:4000/sendrequest", userData);
        
        if (response.status === 200) {
          setMessage("");
          Alert.alert("Your request has been shared. Wait for the user to accept your request.");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }} behavior="padding">
        <ScrollView></ScrollView>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: "#dddddd",
            marginBottom: 20,
          }}
        >
          <Entypo name="emoji-happy" size={24} color="black" />
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 20,
              paddingHorizontal: 10,
              marginLeft: 10,
            }}
            placeholder="Type your message..."
          />
          <View>
            <Pressable
              onPress={sendMessage}
              style={{
                backgroundColor: "#007bff",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 20,
                marginLeft: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default RequestChatRoom;
  
  const styles = StyleSheet.create({});
  