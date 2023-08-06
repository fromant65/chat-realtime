import React, { useState } from "react";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import RoomConfig from "./RoomConfig";
import ProfileConfig from "../profile/ProfileConfig";
import Nav from "../Nav";
import "../../css/chat/chat.css";
import PinnedRooms from "./PinnedRooms";
export const RoomContext = React.createContext();

const Chat = () => {
  const [room, setRoom] = useState("default");
  const [page, setPage] = useState("chat");
  return (
    <div>
      <RoomContext.Provider value={{ room, setRoom }}>
        <Nav setPage={setPage} />
        {page === "chat" ? (
          <div className="main-page">
            <PinnedRooms />
            <div className="chat">
              <RoomConfig />
              <div className="chat-window">
                <Messages />
                <SendMessage />
              </div>
            </div>
          </div>
        ) : page === "profile" ? (
          <ProfileConfig />
        ) : (
          ""
        )}
      </RoomContext.Provider>
    </div>
  );
};

export default Chat;
