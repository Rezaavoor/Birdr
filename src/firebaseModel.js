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
    const hotBirds = model.hotBirds.map(extractCB);

    function extractCB(entry){
      return  {
            name : entry.bird.name,
            viewCount : entry.viewCount,
        }
    }
    return {
        currentBird : model.currentBird,
        hotBirds : hotBirds,
        birdOfTheDay : model.birdOfTheDay
    }
}

function persistenceToModel(data , model){ 
    const currentBird = data?.currentBird || null;
    const hotBirds = data?.hotBirds || {};
    const birdOfTheDay = data.birdOfTheDay;


    function getHotBirdsDetail(hotBirds){
        const hotBirdsDetails = [];

        for(const entry of hotBirds){
            const birdName = entry.name;
            const viewCount = entry.viewCount;

            const bird = getDetails(birdName);

            const birdEntry = {
                bird : bird,
                viewCount : viewCount,
            }
            hotBirdsDetails.push(birdEntry);
        }
        return hotBirdsDetails
    }
    model.currentBird = currentBird;
    model.hotBirds = getHotBirdsDetail(hotBirds);
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
        return [model.hotBirds, model.currentBird, model.BirdOfTheDay];
    }

    function saveChangedValues(){
        saveToFirebase(model);
    }
    
    readFromFirebase(model);
    watchFunction(watchedValues, saveChangedValues);
}

export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}

export default connectToFirebase;

