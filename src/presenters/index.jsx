//import "/src/teacherFetch.js";
import model from "/src/model.js";
import "../globalstyle.css";
import "/src/firebaseModel.js";
import { auth } from "../firebaseModel";

import { observable, configure, reaction } from "mobx";
configure({ enforceActions: "never" });
const reactiveModel = observable(model);

import { createElement } from "react";
window.React = { createElement: createElement };

import { createRoot } from "react-dom/client";
import ReactRoot from "./ReactRoot.jsx";
import connectToFirebase from "../firebaseModel.js";

createRoot(document.getElementById("root")).render(
  <ReactRoot model={reactiveModel} auth={auth} />
);
connectToFirebase(reactiveModel, reaction);
reactiveModel.doSearch(reactiveModel.searchParams);
reactiveModel.init();

