// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdO3hrLB5GLhtqGEDwWUvFSfS52TOqSxo",
  authDomain: "auth-logins-79e70.firebaseapp.com",
  projectId: "auth-logins-79e70",
  storageBucket: "auth-logins-79e70.appspot.com",
  messagingSenderId: "30149020095",
  appId: "1:30149020095:web:627a88132ae156e6b8790a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db=getFirestore(app);

const provider = new FacebookAuthProvider();

const providers = new GoogleAuthProvider();

export {auth, provider, providers}