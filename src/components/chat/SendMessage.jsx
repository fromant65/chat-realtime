import React, { useContext, useState } from "react";
import { auth, firestore } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { RoomContext } from "./Chat";
import "../../css/chat/send-message.css";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { room } = useContext(RoomContext);
  async function handleSendMessage() {
    if (message.trim() === "") return;
    const { uid, displayName, email } = auth.currentUser;
    const username = displayName || email;
    const date = new Date();
    const collectionRef = collection(firestore, "messages");
    addDoc(collectionRef, {
      text: message,
      createdAt: date,
      uid,
      room,
      username,
    });
    setMessage("");
  }
  return (
    <div className="message-form">
      <input
        className="form-input message-input"
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="form-button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default SendMessage;
