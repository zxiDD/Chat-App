import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { List, Divider, TouchableRipple } from "react-native-paper";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
const Chat = ({ username }) => (
  <List.Item
    title={username}
    left={(props) => <List.Icon {...props} icon="face-man" />}
  />
);

const ChatsScreen = ({ navigation, route }) => {
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const user = auth.currentUser;
    const email = user.email;
    q = query(collection(db, "users"), where("email", "!=", email));
    try {
      const querySnapshot = await getDocs(q);
      const userdetails = querySnapshot.docs.map((doc) => doc.data());
      setChats([...userdetails]);
    } catch (error) {
      console.error("Error getting users: ", error);
    }
  };
  const [chats, setChats] = useState([]);
  console.log(chats)
  const handleChatPress = (username) => {
    navigation.navigate("Individual Chat", { username });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <TouchableRipple onPress={() => handleChatPress(item.username)}>
            <Chat username={item.username} />
          </TouchableRipple>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default ChatsScreen;
