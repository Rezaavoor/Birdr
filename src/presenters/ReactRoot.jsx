import HomeP from "./HomeP.jsx";
import SearchP from "./SearchP.jsx";
import HotlistP from "./HotlistP.jsx";
import MyBirdsP from "./MyBirdsP.jsx";
import CurrentbirdP from "./CurrentbirdP.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { theme } from "../theme.js";
import { ThemeProvider } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../views/Navbar.jsx";
import BirdP from "./BirdP.jsx";

export default observer(function ReactRoot(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navbar>
          <HomeP model={props.model} />
        </Navbar>
      ),
    },
    {
      path: "/search",
      element: (
        <Navbar>
          <SearchP model={props.model} />
        </Navbar>
      ),
    },
    {
      path: "/hotlist",
      element: (
        <Navbar>
          <HotlistP model={props.model} />
        </Navbar>
      ),
    },
    {
      path: "/mybirds",
      element: (
        <Navbar>
          <MyBirdsP model={props.model} />
        </Navbar>
      ),
    },
    {
      path: "/currentbird",
      element: (
        <Navbar>
          <CurrentbirdP model={props.model} />
        </Navbar>
      ),
    },
    {
      path: "/bird",
      element: (
        <Navbar>
          <BirdP model={props.model} />
        </Navbar>
      ),
    },
  ]);

  return (
    <ChakraProvider disableGlobalStyle>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ChakraProvider>
  );
});
