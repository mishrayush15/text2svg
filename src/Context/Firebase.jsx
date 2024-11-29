// -- Firebase Context --

import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, set, ref, get } from "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyDtnx-lb005fdQsCSRhSfvYwgvHdcQwocA",
    authDomain: "text2svg-26d60.firebaseapp.com",
    projectId: "text2svg-26d60",
    storageBucket: "text2svg-26d60.firebasestorage.app",
    messagingSenderId: "677237751239",
    appId: "1:677237751239:web:51cacf1c4df063cd1fede2",
    databaseURL: "https://text2svg-26d60-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);


const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);




export const FirebaseProvider = (props) => {

    // Functions ->
    // -- Google Login --
    const GoogleLogIn = async () => {
        const response = await signInWithPopup(firebaseAuth, googleProvider);
        const userRef = ref(database, `/user/${response.user.uid}`);
        const userSnapshot = await get(userRef);
        if(!userSnapshot.exists()){
            set(userRef, {
                username: response.user.displayName,
                email: response.user.email,
                profilePicURL: response.user.photoURL,
                token: 7, 
            })
        }
        console.log(response);
        
    };

    // -- SignOut User --
    const SignOut = () => {
        signOut(firebaseAuth);
        setUser(null);
    };
    

    // -- Current user states --
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null);
            }
        })
    }, [])

    // FLag
    const isLoggedin = user ? true : false;



    return (
        <FirebaseContext.Provider value={{ user, GoogleLogIn, isLoggedin, SignOut }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}