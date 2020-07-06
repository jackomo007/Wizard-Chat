import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCtHrBGsK33WKYkOvQG1uJ8ZrA4lgwMLBs",
  authDomain: "wizardchat-16206.firebaseapp.com",
  databaseURL: "https://wizardchat-16206.firebaseio.com",
  projectId: "wizardchat-16206",
  storageBucket: "wizardchat-16206.appspot.com",
  messagingSenderId: "675377250906",
  appId: "1:675377250906:web:bcd4d9de2317819ac94e63"
};
// Initialize Firebase
let firebaseAPP = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseAPP.auth()
let firebaseDb = firebaseAPP.database()

export { firebaseAuth, firebaseDb }
