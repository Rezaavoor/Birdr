import HomeP from "./HomeP.jsx";
import SearchP from "./SearchP.jsx";
import HotlistP from "./HotlistP.jsx";
import MyBirdsP from "./MyBirdsP.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { theme } from "../theme.js";
import { ThemeProvider } from "@emotion/react";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import NavbarP from "./NavbarP.jsx";
import BirdP from "./BirdP.jsx";

export default observer(function ReactRoot(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <NavbarP auth={props.auth} model={props.model} >
          <HomeP model={props.model}  />
        </NavbarP>
      ),
    },
    {
      path: "/search",
      element: (
        <NavbarP auth={props.auth} model={props.model} >
          <SearchP model={props.model} />
        </NavbarP>
      ),
    },
    {
      path: "/hotlist",
      element: (
        <NavbarP auth={props.auth} model={props.model} >
          <HotlistP model={props.model} />
        </NavbarP>
      ),
    },
    {
      path: "/mybirds",
      element: (
        <NavbarP auth={props.auth} model={props.model} >
          <MyBirdsP model={props.model} />
        </NavbarP>
      ),
    },
    {
      path: "/bird/:id",
      element: (
        <NavbarP auth={props.auth} model={props.model}>
          <BirdP model={props.model} />
        </NavbarP>
      ),
    },
    // handle 404 by redirect to default rout
    {
      path: "*", 
      element: (
        <NavbarP auth={props.auth} model={props.model}>
          <HomeP model={props.model} />
        </NavbarP>
      ),
    }
  ]);

  return (
    <ChakraProvider disableGlobalStyle>
      <ThemeProvider theme={theme}>
      { (props.model.ready )? <RouterProvider router={router} /> : <Spinner size = "xl"/>} 
      </ThemeProvider>
    </ChakraProvider>
  );
});
