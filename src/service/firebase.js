import firebase from "firebase";
const config = {
  apiKey: "AIzaSyCJG_Q1yOENZFjmyczO60Y0AeUMWCfmg8I",
  authDomain: "react-app-chat-1.firebaseapp.com",
  databaseURL: "https://react-app-chat-1.firebaseio.com",
  projectId: "react-app-chat-1",
  storageBucket: "react-app-chat-1.appspot.com",
  messagingSenderId: "819633721656",
  appId: "1:819633721656:web:b0f18912a5c67182deb1cd",
  measurementId: "G-BNR6PZJC17"
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const datebaseMessages = firebase.database();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = _ => {
  auth.signInWithPopup(provider);
};
export const generateUserDocument = async (displayName, user) => {
  if (!user) return;

  const snapshot = await datebaseMessages.ref(`user/${user.uid}`).on('value', snap => snap.val());

  if (!snapshot.exists) {
    const {email, uid } = user;
    try {
    await datebaseMessages.ref(`users/${uid}`).set({
      user: displayName,
      email: email,
      avatar: "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png",
      userId: uid
    });
    } 
    catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await datebaseMessages.ref(`users/${uid}`).on('value', snap => snap.val());

    return { uid, ...userDocument };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

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