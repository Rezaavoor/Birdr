import HomeP from "./HomeP.jsx";
import SearchP from "./SearchP.jsx";
import HotlistP from "./HotlistP.jsx";
import MyBirdsP from "./MyBirdsP.jsx";
import CurrentbirdP from "./CurrentbirdP.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { theme } from "../theme.js";
import { ThemeProvider } from "@emotion/react";
import Navbar from "../views/Navbar.jsx";

export default observer(function ReactRoot(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeP model={props.model} />,
    },
    {
      path: "/search",
      element: <SearchP model={props.model} />,
    },
    {
      path: "/hotlist",
      element: <HotlistP model={props.model} />,
    },
    {
      path: "/mybirds",
      element: <MyBirdsP model={props.model} />,
    },
    {
      path: "/currentbird",
      element: <CurrentbirdP model={props.model} />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <RouterProvider router={router} />
      </Navbar>
    </ThemeProvider>
  );
});
