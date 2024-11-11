// import {
//     KeyboardAvoidingView,
//     StyleSheet,
//     Text,
//     View,
//     SafeAreaView,
//     TextInput,
//     Pressable,
//     Image,
//     Alert,
//   } from "react-native";
// import React,{useState} from 'react'
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// const RegisterScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [image, setImage] = useState("");
//   const [name,setName] = useState("")
//   const navigation = useNavigation();

//   const handleRegister = ()=>{
//     const user = {
//         name:name,
//         email:email,
//         password:password,
//         image:image,
//     };

//     axios.post("http://192.168.1.9:4000/register",user).then(response => {
//         console.log(response);
//         Alert.alert("User Registered");
//         setName("")
//         setEmail("")
//         setPassword("")
//         setImage("")
//     }).catch(error => {
        // Alert.alert(
        //     'Registration error',
        //     'An error ocurred while registering!',
        //   );
        // });
//   }
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
//               Lets set up your account
//             </Text>


//             <Text
//               style={{
//                 fontSize: 10,
//                 margingTop:10,
                
//               }}
//             >
//              Profiles are visible to your friends and connection and groups
//             </Text>

//             <Pressable>
//   <Image
//     source={
//       image
//         ? { uri: image }
//         : require("../assets/profile.jpg")
//     }
//     style={{ width: 50, height: 50, borderRadius: 25, marginTop:20 }}
//   />
//   <Text style={{textAlign:"center",marginTop:4,color:"gray",fontSize:12}} >Add</Text>
// </Pressable>




//           </View>


//           <View>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: "bold",
//                   color: "gray",
//                   marginTop: 30,
//                 }}
//               >
//                 Name
//               </Text>
//             </View>
//             <View>
//               <TextInput
//                 value={name}
//                 onChange={setName}
//                 placeholder="Enter your Name"
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


//           <View style={{ marginTop: 10 }}>
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
//                   marginTop: 10,
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

//             <View>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: "bold",
//                   color: "gray",
//                   marginTop: 10,
//                 }}
//               >
//                 Image
//               </Text>
//             </View>
//             <View>
//               <TextInput
//                 value={image}
//                 onChange={setImage}
//                 placeholder="Enter your image url"
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
//             onPress={handleRegister}
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
//                 Register
//               </Text>
//             </Pressable>

//             <Pressable onPress={() => navigation.navigate("Login")} style={{ marginTop: 20 }} >
//               <Text style={{ textAlign: "center", marginTop: 15 }}>
//                 Already have an account? Login
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
            
//           </View>
//         </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   )
// }

// export default RegisterScreen

// const styles = StyleSheet.create({})
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Pressable,
    Image,
    Alert,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  
  const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
  
    const handleRegister = () => {
      const user = {
        name: name,
        email: email,
        password: password,
        image: image,
      };
  
      axios
        .post("http://192.168.1.8:4000/register", user)
        .then((response) => {
          console.log(response);
          Alert.alert("User Registered");
          setName("");
          setEmail("");
          setPassword("");
          setImage("");
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Registration failed. Please try again.");
        });
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView contentContainerStyle={{ padding: 10, alignItems: "center" }}>
          <KeyboardAvoidingView>
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Let's set up your account
              </Text>
              <Text style={{ fontSize: 10, marginTop: 10, color: "gray" }}>
                Profiles are visible to your friends, connections, and groups.
              </Text>
  
              <Pressable style={{ marginTop: 20 }}>
                <Image
                  source={
                    image
                      ? { uri: image }
                      : require("../assets/profile.jpg")
                  }
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 4,
                    color: "gray",
                    fontSize: 12,
                  }}
                >
                  Add
                </Text>
              </Pressable>
            </View>
  
            <View style={{ width: '100%' }}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="gray"
                style={styles.input}
              />
  
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="gray"
                keyboardType="email-address"
                style={styles.input}
              />
  
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="gray"
                secureTextEntry
                style={styles.input}
              />
  
              <Text style={styles.label}>Image URL</Text>
              <TextInput
                value={image}
                onChangeText={setImage}
                placeholder="Enter image URL"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>
  
            <Pressable onPress={handleRegister} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </Pressable>
  
            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={{ marginTop: 20 }}
            >
              <Text style={{ textAlign: "center", marginTop: 15 }}>
                Already have an account? Login
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  
  const styles = StyleSheet.create({
    label: {
      fontSize: 18,
      fontWeight: "bold",
      color: "gray",
      marginTop: 30,
    },
    input: {
      width: 320,
      marginTop: 15,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      paddingBottom: 10,
      fontSize: 16,
    },
    registerButton: {
      width: 200,
      backgroundColor: "#4A55A2",
      padding: 15,
      marginTop: 50,
      borderRadius: 5,
      alignItems: "center",
      alignSelf: "center",
    },
    registerButtonText: {
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
    },
  });
  