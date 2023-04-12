import React, { useContext } from "react";
import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";
import { UserContext } from "../../App";

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  async function handleLogOut() {
    try {
      await signOut(auth);
      setCurrentUser({});
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <button onClick={handleLogOut} className="nav-button">
        Log out
      </button>
    </div>
  );
};

export default Logout;
