import "src/firebaseModel";


export default function authPresenter() {

    const provider = new GoogleAuthProvider();

    function signInHnadlerACB() {
        signInWithPopup(auth, provider);
    }
    return <AuthView singIn ={signInHnadlerACB}/>;
}
