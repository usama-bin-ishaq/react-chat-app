// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwb2j3-0ySBS8KXxGUSzzE_-UEDQjZaPQ",
  authDomain: "react-chat-app-24072.firebaseapp.com",
  projectId: "react-chat-app-24072",
  storageBucket: "react-chat-app-24072.appspot.com",
  messagingSenderId: "1045653884192",
  appId: "1:1045653884192:web:c0ebe0799dde2593909b45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);