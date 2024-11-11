import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import User from "../componets/User";
import { useNavigation } from "@react-navigation/native";

const PeopleScreen = () => {
  const [users, setUsers] = useState({});
  const { token, userId } = useContext(AuthContext);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://192.168.1.8:4000/users/${userId}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);
  const navigation= useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            fontWeight: "500",
            marginTop: 50,
          }}
        >
          People in the event
        </Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => <User item={item} key={item?._id} />}
      />
    </SafeAreaView>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({});
