import { observer } from "mobx-react-lite";
import Navbar from "../views/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default observer(function NavbarP({ children, auth, model }) {
  const navigate = useNavigate();

  function onButtonClick(route) {
    navigate(route);
  }
  const provider = new GoogleAuthProvider();

  async function logInHandlerACB() {
    try {
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  }
  function logOutHandlerACB() {
    model.signOut();
  }

  return (
    <Navbar
      onButtonClick={onButtonClick}
      logOutHandler={logOutHandlerACB}
      logInHandler={logInHandlerACB}
      user={model.user || null}
    >
      {children}
    </Navbar>
  );
});
