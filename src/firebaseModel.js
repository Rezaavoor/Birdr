import { initializeApp } from "firebase/app";
import firebaseConfig from "/src/firebaseConfig.js";
import { getDatabase, ref, get, set} from "firebase/database";
import { getDetails } from "./modelSource";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged, signOut,} from 'firebase/auth';

const PATH = "Model";



const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const rf = ref(db, PATH)

const auth = getAuth(app)

const provider = new GoogleAuthProvider();

function modelToPersistence(model){
    
    return {
        currentBird : model.currentBird,
        hotBirds : model.hotBirds,
        birdOfTheDay : model.birdOfTheDay
    }
}

function persistenceToModel(data , model){ 
    const currentBird = data?.currentBird || null;
    const hotBirds = data?.hotBirds || {};
    const birdOfTheDay = data.birdOfTheDay;

    model.currentBird = currentBird;
    model.hotBirds = hotbirds;
    model.birdOfTheDay = birdOfTheDay;

    return model;
}

function saveToFirebase(model){
    if(model.ready){
        const data = modelToPersistence(model);
        set(rf, data);
    }
}

function readFromFirebase(model){

    model.ready = false;

    function convertACB(snapshot){
        return persistenceToModel(snapshot.val(), model);
    }

    function setModelToReadyACB(model){
        model.ready = true;
    }

    return get(rf).then(convertACB).then(setModelToReadyACB);
}

function connectToFirebase(model, watchFunction){

    function watchedValues(){
        return [model.hotBirds, model.currentBird, model.birdOfTheDay];
    }

    function saveChangedValues(){
        saveToFirebase(model);
    }
    
    readFromFirebase(model);
    watchFunction(watchedValues, saveChangedValues);
}

export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}

export default connectToFirebase;

