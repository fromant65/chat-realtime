import React, { useContext, useEffect, useState } from "react";
import { firestore } from "../../../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { RoomContext } from "./Chat";
import "../../css/chat/messages.css";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { room } = useContext(RoomContext);
  const firestoreRef = collection(firestore, "messages");
  const msgQuery = query(
    firestoreRef,
    where("room", "==", room),
    orderBy("createdAt", "asc")
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(msgQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [room]);
  return (
    <div className="messages">
      {messages.map((message) => {
        const { username, createdAt, text, id } = message;
        const date = createdAt.toDate().toTimeString().split(" ")[0];
        return (
          <div key={id} className="message-container">
            <div className="message-sender">
              {username}, {date}
            </div>
            <div className="message-content">{text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
