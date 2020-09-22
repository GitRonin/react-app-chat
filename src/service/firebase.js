import firebase from "firebase";
const config = {
  apiKey: "AIzaSyCJG_Q1yOENZFjmyczO60Y0AeUMWCfmg8I",
  authDomain: "react-app-chat-1.firebaseapp.com",
  databaseURL: "https://react-app-chat-1.firebaseio.com"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();

// var firebaseConfig = {
//     apiKey: "AIzaSyCJG_Q1yOENZFjmyczO60Y0AeUMWCfmg8I",
//     authDomain: "react-app-chat-1.firebaseapp.com",
//     databaseURL: "https://react-app-chat-1.firebaseio.com",
//     projectId: "react-app-chat-1",
//     storageBucket: "react-app-chat-1.appspot.com",
//     messagingSenderId: "819633721656",
//     appId: "1:819633721656:web:b0f18912a5c67182deb1cd",
//     measurementId: "G-BNR6PZJC17"
//   };