import { initializeApp } from "firebase/app";
import firebaseConfig from "/src/firebaseConfig.js";
import { getDatabase, ref, get, set, off, onValue } from "firebase/database";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const PATH = "Model";

const Users = "Users";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const rf = ref(db, PATH);

const auth = getAuth(app);

function modelToPersistence(model) {
  return {
    hotBirds: model.hotBirds,
  };
}

function userModelToPresistence(model) {
  return {
    likedBirds: model.likedBirds || [],
    currentBird: model.currentBird || "",
  };
}

function persistenceToModel(data, model) {
  const hotBirds = data?.hotBirds || [];
  model.hotBirds = hotBirds;
  return model;
}
function userPresistenceToModel(data, model) {
  const likedBirds = data?.likedBirds || [];
  if (data?.currentBird) {
    model.setCurrentBird(data.currentBird);
  } else {
    model.currentBird = "";
  }
  model.likedBirds = likedBirds;

  return model;
}
function saveToFirebase(model) {
  if (model.ready) {
    const data = modelToPersistence(model);
    if (model.user) {
      const userData = userModelToPresistence(model);
      set(ref(db, `${Users}/${model.user.uid}`), userData);
    }

    set(rf, data);
  }
}

function readFromFirebase(model) {
  model.ready = false;
  function convertACB(snapshot) {
    return persistenceToModel(snapshot.val(), model);
  }
  function convertUserDataACB(snapshot) {
    return userPresistenceToModel(snapshot.val(), model);
  }

  function setModelToReadyACB(model) {
    model.ready = true;
  }
  if (model.user) {
    const userPromise = get(ref(db, `${Users}/${model.user.uid}`)).then(
      convertUserDataACB
    );
    const modelPromise = get(rf).then(convertACB);

    return Promise.all([userPromise, modelPromise]).then(setModelToReadyACB);
  } else {
    return get(rf).then(convertACB).then(setModelToReadyACB);
  }
}

function connectToFirebase(model, watchFunction) {
  function watchedValues() {
    return [
      model.hotBirds,
      model.currentBird,
      model.birdOfTheDay,
      model.likedBirds,
    ];
  }

  function saveChangedValues() {
    saveToFirebase(model);
  }

  function loginOrOutACB(user) {
    if (user) {
      model.user = user;
    } else {
      model.user = null;
      model.likedBirds = [];
      model.currentBird = "";
    }
    readFromFirebase(model);
  }
  readFromFirebase(model);
  onAuthStateChanged(auth, loginOrOutACB);
  watchFunction(watchedValues, saveChangedValues);
}

export {
  modelToPersistence,
  persistenceToModel,
  saveToFirebase,
  readFromFirebase,
  userPresistenceToModel,
  auth,
};

export default connectToFirebase;

