// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TextInput,
//   Pressable,
//   Image,
// } from "react-native";
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from "../AuthContext";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigation = useNavigation();
//   const { token, setToken } = useContext(AuthContext);
//   useEffect(() => {
//     if (token) {
//       navigation.replace("MainStack", { screen: "Main" });
//     }
//   }, [token, navigation]);
//   const handleLogin = () => {
//     const user = {
//       email: email,
//       password: password,
//     };
//     axios
//       .post("http://192.168.1.10:8000/login", user)
//       .then((response) => {
//         const token = response.data.token;
//         AsyncStorage.setItem("authToken", token);
//         setToken(token);
//       })
     
//   };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <View style={{ padding: 10, alignItems: "center" }}>
//         <KeyboardAvoidingView>
//           <View
//             style={{
//               alignItems: "center",
//               alignItems: "center",
//               justifyContent: "center",
//               marginTop: 100,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: "bold",
//               }}
//             >
//               Login to your account
//             </Text>
//           </View>

//           <View style={{ marginTop: 50 }}>
//             <View>
//               <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
//                 Email
//               </Text>
//             </View>
//             <View>
//               <TextInput
//                 value={email}
//                 onChange={setEmail}
//                 placeholder="Enter your email"
//                 placeholderTextColor="gray"
//                 style={{
//                   width: 320,
//                   marginTop: 15,
//                   borderBottomWidth: 1,
//                   borderBottomColor: "gray",
//                   paddingBottom: 10,
//                   fontSize: email ? 16 : 16,
//                 }}
//               ></TextInput>
//             </View>

//             <View>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: "bold",
//                   color: "gray",
//                   marginTop: 50,
//                 }}
//               >
//                 Password
//               </Text>
//             </View>
//             <View>
//               <TextInput
//                 value={password}
//                 onChange={setPassword}
//                 placeholder="Enter your Password"
//                 placeholderTextColor="gray"
//                 style={{
//                   width: 320,
//                   marginTop: 15,
//                   borderBottomWidth: 1,
//                   borderBottomColor: "gray",
//                   paddingBottom: 10,
//                   fontSize: email ? 16 : 16,
//                 }}
//               ></TextInput>
//             </View>
//           </View>
//           <View>
//             <Pressable
//               onPress={handleLogin}
//               style={{
//                 width: 200,
//                 backgroundColor: "#4A55A2",
//                 padding: 15,
//                 marginTop: 50,
//                 marginLeft: "auto",
//                 marginRight: "auto",
//                 borderRadius: 5,
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{ fontSize: 15, color: "white", fontWeight: "bold" }}
//               >
//                 Login
//               </Text>
//             </Pressable>

//             <Pressable
//               onPress={() => navigation.navigate("Register")}
//               style={{ marginTop: 20 }}
//             >
//               <Text style={{ textAlign: "center", marginTop: 15 }}>
//                 Don't have an account? Sign Up
//               </Text>
//             </Pressable>
//           </View>

//           <View
//             style={{
//               marginTop: 50,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Image
//               style={{ width: 150, height: 150 }}
//               source={require("../assets/ChatSymbolInLoginScreen.png")}
//             />
//           </View>
//         </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({});
// LoginScreen.js
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.replace("MainStack", { screen: "Main" });
    }
  }, [token, navigation]);

  const handleLogin = () => {
    const user = { email, password };
    axios
      .post("http://192.168.1.8:4000/login", user)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        setToken(token);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login to your account</Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail} // Use onChangeText
              placeholder="Enter your email"
              placeholderTextColor="gray"
              style={{
                width: 320,
                marginTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                paddingBottom: 10,
                fontSize: 16,
              }}
            />

            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray", marginTop: 50 }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword} // Use onChangeText
              placeholder="Enter your Password"
              placeholderTextColor="gray"
              secureTextEntry
              style={{
                width: 320,
                marginTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                paddingBottom: 10,
                fontSize: 16,
              }}
            />
          </View>

          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              marginTop: 50,
              alignSelf: "center",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", marginTop: 15 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>

          <View style={{ marginTop: 50, justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../assets/ChatSymbolInLoginScreen.png")}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
