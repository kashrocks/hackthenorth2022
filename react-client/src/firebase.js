import firebase from 'firebase/compat/app';
import functions from "firebase/compat/functions";

const firebaseConfig = {
    apiKey: "AIzaSyDTBTkZ9mobaeCp36iNQvciIeu6IWZkmqE",
    authDomain: "stinkdinky123.firebaseapp.com",
    projectId: "stinkdinky123",
    storageBucket: "stinkdinky123.appspot.com",
    messagingSenderId: "1025070754856",
    appId: "1:1025070754856:web:93ef4a405258f8247ad91d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

let HttpsFunctions = firebase.functions();
export { HttpsFunctions };