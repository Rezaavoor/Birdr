import HomeP from "./HomeP.jsx";
import SearchP from "./SearchP.jsx";
import HotlistP from "./HotlistP.jsx";
import MyBirdsP from "./MyBirdsP.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { theme } from "../theme.js";
import { ThemeProvider } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import NavbarP from "./NavbarP.jsx";
import BirdP from "./BirdP.jsx";

export default observer(function ReactRoot(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <NavbarP>
          <HomeP model={props.model} auth={props.auth} />
        </NavbarP>
      ),
    },
    {
      path: "/search",
      element: (
        <NavbarP>
          <SearchP model={props.model} />
        </NavbarP>
      ),
    },
    {
      path: "/hotlist",
      element: (
        <NavbarP>
          <HotlistP model={props.model} />
        </NavbarP>
      ),
    },
    {
      path: "/mybirds",
      element: (
        <NavbarP>
          <MyBirdsP model={props.model} />
        </NavbarP>
      ),
    },
    {
      path: "/bird",
      element: (
        <NavbarP>
          <BirdP model={props.model} />
        </NavbarP>
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
