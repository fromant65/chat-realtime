import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "./Chat";
import { UserContext } from "../../App";
import { firestore } from "../../../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import "../../css/chat/pinned-rooms.css";
const PinnedRooms = () => {
  const [pinnedRooms, setPinnedRooms] = useState([]);
  const { room, setRoom } = useContext(RoomContext);
  const { currentUser } = useContext(UserContext);
  async function getPinnedRooms() {
    const firestoreRef = collection(firestore, "userRooms");
    const roomsQuery = query(
      firestoreRef,
      where("userid", "==", currentUser.email)
    );
    const querySnapshot = await getDocs(roomsQuery);
    const document = querySnapshot.docs[0];
    return document.data().rooms;
  }

  async function pinRoom(currentRoom) {
    const pinRoomButton = document.querySelector(".pin-room");
    pinRoomButton.disabled = true;
    try {
      const firestoreRef = collection(firestore, "userRooms");
      const roomsQuery = query(
        firestoreRef,
        where("userid", "==", currentUser.email)
      );
      const querySnapshot = await getDocs(roomsQuery);
      const document = querySnapshot.docs[0];
      if (document) {
        const rooms = document.data().rooms || [];

        // Verifica si el room ya está en el array antes de agregarlo
        if (!rooms.includes(currentRoom)) {
          rooms.push(currentRoom);
          // Actualiza el array "rooms" en el documento del usuario
          await updateDoc(document.ref, { rooms: rooms });
          setPinnedRooms(rooms);
        }
      } else {
        // Si el documento del usuario no existe, crea uno nuevo con el array "rooms"
        await addDoc(firestoreRef, {
          userid: currentUser.email,
          rooms: [currentRoom],
        });
        setPinnedRooms([currentRoom]);
      }
      pinRoomButton.disabled = false;
    } catch (error) {
      pinRoomButton.disabled = false;
      console.error("Error al agregar el room al usuario:", error);
    }
  }

  async function unpinRoom(room) {
    try {
      const firestoreRef = collection(firestore, "userRooms");
      const roomsQuery = query(
        firestoreRef,
        where("userid", "==", currentUser.email)
      );
      const querySnapshot = await getDocs(roomsQuery);
      const document = querySnapshot.docs[0];
      let rooms = document.data().rooms || [];

      // removemos el room que se intenta quitar de la lista
      rooms = rooms.filter((_room) => _room !== room);
      // Actualiza el array "rooms" en el documento del usuario
      await updateDoc(document.ref, { rooms: rooms });
      setPinnedRooms(rooms);
    } catch (error) {
      console.error("Error al agregar el room al usuario:", error);
    }
  }

  useEffect(() => {
    getPinnedRooms().then((data) => {
      setPinnedRooms(data);
      const pinButton = document.querySelector(".pin-room");
      pinButton.disabled = false;
    });
  }, []);
  return (
    <div className="pinned-rooms__container">
      <h2 className="pinned-rooms__title">Pinned Rooms</h2>
      {pinnedRooms
        ? pinnedRooms.map((currentRoom) => {
            return (
              <div key={currentRoom} className="pinned-room">
                <button
                  className="pinned-room__button"
                  onClick={() => setRoom(currentRoom)}
                >
                  {currentRoom}
                </button>
                <button
                  className="unpin-room__button"
                  onClick={() => unpinRoom(currentRoom)}
                >
                  Unpin Room
                </button>
              </div>
            );
          })
        : ""}
      <button
        className="pin-room"
        disabled={true}
        onClick={() => pinRoom(room)}
      >
        Pin this room.
      </button>
    </div>
  );
};

export default PinnedRooms;
