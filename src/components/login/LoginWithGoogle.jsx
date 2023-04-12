import React, { useContext } from "react";
import { auth } from "../../../firebase";
import { googleProvider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { UserContext } from "../../App";
const LoginWithGoogle = () => {
  const { setCurrentUser } = useContext(UserContext);
  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
      setCurrentUser(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="form">
      <button className="form-button" onClick={handleGoogleLogin}>
        Sign up with Google
      </button>
    </div>
  );
};

export default LoginWithGoogle;
