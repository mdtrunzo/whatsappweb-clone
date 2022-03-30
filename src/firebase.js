import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_QqoBDvOdysiUwtbumMC4DJuJPfTAwPI",
    authDomain: "whatsapp-clone-84d98.firebaseapp.com",
    projectId: "whatsapp-clone-84d98",
    storageBucket: "whatsapp-clone-84d98.appspot.com",
    messagingSenderId: "505218933074",
    appId: "1:505218933074:web:0aefae639ee9f67d825a8b"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new GoogleAuthProvider();

export { auth, db, provider }; 