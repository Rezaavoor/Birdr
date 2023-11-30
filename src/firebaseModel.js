import { initializeApp } from "firebase/app";
import firebaseConfig from "/src/firebaseConfig.js";
import { getDatabase, ref, get, set} from "firebase/database";


const PATH = "birdr";


const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const rf = ref(db, PATH)



