import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { UserContext } from "../../App";

const LoginWithMail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUser } = useContext(UserContext);

  async function handleEmailLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage("");
      setCurrentUser(auth.currentUser);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }
  return (
    <div className="login-form form">
      <input
        className="form-input"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="form-button" onClick={handleEmailLogin}>
        Sign in
      </button>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default LoginWithMail;
