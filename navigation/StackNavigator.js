import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import  ChatsScreen  from "../Screens/ChatScreen";
import  ProfileScreen  from "../Screens/ProfileScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import LoginScreen from "../Screens/LoginScreen";
import PeopleScreen from "../Screens/PeopleScreen";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";
import RequestChatRoom from "../Screens/RequestChatRoom";
import ChatRoom from "../Screens/ChatRoom";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const {token, setToken} = useContext(AuthContext)
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Chats"
          component={ChatsScreen}
          options={{
            tabBarStyle: { backgroundColor: "#101010" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="chat" size={24} color="white" />
              ) : (
                <Entypo name="chat" size={24} color="gray" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: { backgroundColor: "#101010" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="user" size={24} color="white" />
              ) : (
                <FontAwesome name="user" size={24} color="gray" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  };

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="People"
          component={PeopleScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Request"
          component={RequestChatRoom}
          
        />
          <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          
        />
      </Stack.Navigator>
    );
  }

  return (
        <NavigationContainer>
           {token === null|| token === "" ? <AuthStack/> : <MainStack/>}
        </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
