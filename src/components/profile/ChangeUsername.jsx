import React, { useState } from "react";
import { app } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import "../../css/profile/change-username.css";

const ChangeUsername = () => {
  const [newUsername, setNewUsername] = useState("");
  const user = getAuth(app).currentUser;
  async function handleUpdateUsername() {
    try {
      await updateProfile(user, { displayName: newUsername });
      setNewUsername("");
      alert("Username updated successfully");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="change-username">
      <div className="username">
        Username: <b>{user.displayName || "undefined"}</b>
      </div>
      <input
        className="form-input"
        type="text"
        placeholder="New username..."
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button className="form-button" onClick={handleUpdateUsername}>
        Update Username
      </button>
    </div>
  );
};

export default ChangeUsername;
