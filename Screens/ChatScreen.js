import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from "axios";
import Chat from "../componets/Chat";
// import AntDesign from '@expo/vector-icons/AntDesign';
const ChatScreen = () => {
  const [options, setOptions] = useState(["Chats"]);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  const { token, setToken, setUserId, userId } = useContext(AuthContext);



  const chooseOption = (option) => {
    if (options.includes(option)) {
      setOptions(options.filter((c) => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };
  const navigation = useNavigation();
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login");
      setToken("");
    } catch (error) {
      console.log("error clearing token", error);
    }
  };
  // const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
          setToken(token); // set token if decoding is successful
        } catch (error) {
          console.error("Token decoding failed:", error);
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getrequests();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getrequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.8:4000/getrequests/${userId}`
      );
      setRequests(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(requests);
  const acceptRequest = async (requestId) => {
    try {
      const response = await axios.post(
        "http://192.168.1.8:4000/acceptrequest",
        {
          userId: userId,
          requestId: requestId,
        }
      );

      if (response.status === 200) {
        // Filter out the accepted request from the local state
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.from._id !== requestId)
        );
      }
    } catch (error) {
      console.log("Error accepting request:", error.message);
    }
  };
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.8:4000/users/${userId}`,
        {}
      );
      setChats(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(chats);
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={logout}>
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={require("../assets/person-profile.jpeg")}
          ></Image>
        </Pressable>

        <Text style={{ fontSize: 15, fontWeight: "500" }}>Chats</Text>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AntDesign name="camera" size={26} color="black" />
            <Ionicons
              onPress={() => navigation.navigate("People")}
              name="person-outline"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>

      <View style={{ padding: 10 }}>
        <Pressable
          onPress={() => chooseOption("Chats")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text>Chats</Text>
          </View>
          <Entypo name="chevron-down" size={24} color="black" />
        </Pressable>

        <View>
          {options?.includes("Chats") &&
            (chats?.length > 0 ? (
              <View>
                {chats?.map((item, index) => (
                  <Chat item={item} key={item._id} />
                ))}
              </View>
            ) : (
              <View
                style={{
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ textAlign: "center", color: "gray" }}>
                    No Chats
                  </Text>
                  <Text style={{ marginTop: 4, color: "gray" }}>
                    Get Started by messaging a friends
                  </Text>
                </View>
              </View>
            ))}
        </View>

        <Pressable
          onPress={() => chooseOption("Requests")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text>Requests</Text>
          </View>
          <Entypo name="chevron-down" size={24} color="black" />
        </Pressable>
        <View style={{ marginVertical: 12 }}>
          {options?.includes("Requests") && (
            <View>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Checkout all the requests
              </Text>
              {requests?.map((item, index) => (
                <Pressable
                  key={item?.from?._id || index}
                  style={{ marginVertical: 12 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Pressable>
                      <Image
                        source={
                          require("../assets/profile.jpg") // Adjust the path based on your folder structure
                        }
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                      />
                    </Pressable>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        {item?.from?.name} sent you a request
                      </Text>
                      <Text style={{ marginTop: 4, color: "gray" }}>
                        {item?.message}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => {
                        acceptRequest(item?.from?._id); // Pass the user ID to the acceptRequest function
                      }}
                      style={{
                        padding: 8,
                        backgroundColor: "#005187",
                        width: 75,
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Accept
                      </Text>
                    </Pressable>
                    <AntDesign name="delete" size={24} color="red" />
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
