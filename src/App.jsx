import { useEffect, useState } from "react";
import React from "react";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import { auth } from "../firebase";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user);
    });
    return unsuscribe;
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}
      >
        {currentUser === "" ? "" : currentUser === null ? <Login /> : <Chat />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
