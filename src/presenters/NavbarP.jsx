import { observer } from "mobx-react-lite";
import Navbar from "../views/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default observer(function NavbarP({ children }) {
  const navigate = useNavigate();
  const [currentRoute, setCurrentRoute] = useState("/"); // possible routes: home, search, hotlist, mybirds, bird, auth

  function onButtonClick(route) {
    setCurrentRoute(route);
    navigate(route);
  }

  return (
    <Navbar onButtonClick={onButtonClick} currentRoute={currentRoute}>
      {children}
    </Navbar>
  );
});
