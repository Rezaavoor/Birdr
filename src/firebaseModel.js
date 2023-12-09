import { initializeApp } from "firebase/app";
import firebaseConfig from "/src/firebaseConfig.js";
import { getDatabase, ref, get, set} from "firebase/database";

import { getAuth, onAuthStateChanged,} from 'firebase/auth';

const PATH = "Model";

const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const rf = ref(db, PATH)

//set(rf,"test");

const auth = getAuth(app)



function modelToPersistence(model){
    if(model.user){
        return {
            likedBirds: model.likedBirds,
            currentBird : model.currentBird,
            hotBirds : model.hotBirds,
            birdOfTheDay : model.birdOfTheDay
        } 
    } else{
        return {
            currentBird : model.currentBird,
            hotBirds : model.hotBirds,
            birdOfTheDay : model.birdOfTheDay
        }
    }
}

function persistenceToModel(data , model){ 
    
        const currentBird = data?.currentBird || null;
        const hotBirds = data?.hotBirds || [];
        const birdOfTheDay = data?.birdOfTheDay || null;
        
        const likedBirds = model.user ? (data?.likedBirds || []) : [];


        model.currentBird = currentBird;
        model.likedBirds = likedBirds;
        model.hotBirds = hotBirds;
        model.birdOfTheDay = birdOfTheDay;


    return model;

    
}

function saveToFirebase(model){
    if(model.ready && model.user){
        const data = modelToPersistence(model);
        set(ref(db, model.user.uid), data);
    } else if(model.ready && !model.user){
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
    if(model.user){
        return get(ref(db, model.user.uid)).then(convertACB).then(setModelToReadyACB);
    } else{
        return get(rf).then(convertACB).then(setModelToReadyACB);
    }
}

function connectToFirebase(model, watchFunction){

    function watchedValues(){
        return [model.hotBirds, model.currentBird, model.birdOfTheDay, model.likedBirds];
    }

    function saveChangedValues(){
        saveToFirebase(model);
    }

    function loginOrOutACB(user){
        model.user = user || null;
    }

    onAuthStateChanged(auth, loginOrOutACB);
    readFromFirebase(model);
    watchFunction(watchedValues, saveChangedValues);
}

export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}

export default connectToFirebase;

