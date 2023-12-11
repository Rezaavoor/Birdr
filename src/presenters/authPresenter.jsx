import {auth } from  "src/firebaseModel.js";
import Home from "views/Home,jsx"


export default function authPresenter(auth) {

    const provider = new GoogleAuthProvider();

    function signInHnadlerACB() {
        signInWithPopup(auth, provider);
    }
    return <Home singInhandler ={signInHnadlerACB}/>;
}
