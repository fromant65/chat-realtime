import React from "react";
import Logout from "./login/Logout";
import "../css/nav.css";
const Nav = ({ setPage }) => {
  return (
    <div className="nav-container">
      <button className="nav-button" onClick={() => setPage("chat")}>
        Chat
      </button>
      <button className="nav-button" onClick={() => setPage("profile")}>
        Profile
      </button>
      <Logout />
    </div>
  );
};

export default Nav;
