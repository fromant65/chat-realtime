import React, { useContext, useState } from "react";
import { RoomContext } from "./Chat";
import "../../css/chat/room-config.css";

const RoomConfig = () => {
  const { room, setRoom } = useContext(RoomContext);
  const [newRoom, setNewRoom] = useState("");
  return (
    <div className="room-config-container">
      <div className="room">
        Room: <b>{room}</b>
      </div>
      <input
        className="form-input room-input"
        type="text"
        placeholder={room}
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
      />
      <button
        className="form-button room-button"
        onClick={() => {
          setRoom(newRoom);
          setNewRoom("");
        }}
      >
        Change Room
      </button>
    </div>
  );
};

export default RoomConfig;
