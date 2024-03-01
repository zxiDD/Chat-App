import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
const IndividualChat = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ref = doc(
      db,
      "chats",
      auth?.currentUser?.displayName + route.params.username
    );
    const q = query(collection(ref, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => {
        return { ...doc.data(), createdAt: doc.data().createdAt.toDate() };
      });
      setMessages(allMessages);
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      user: {
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      },
      createdAt: new Date(),
    };

    try {
      const ref = doc(
        db,
        "chats",
        "" + auth?.currentUser?.displayName + route.params.username
      );
      await addDoc(collection(ref, "messages"), myMsg);
      console.log("Document written with ID: ", ref.id);

      const ref1 = doc(
        db,
        "chats",
        "" + route.params.username + auth?.currentUser?.displayName
      );
      await addDoc(collection(ref1, "messages"), myMsg);
      console.log("Document written with ID: ", ref1.id);

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [myMsg])
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      }}
    />
  );
};

export default IndividualChat;
