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
export const generateUserDocument = async (user, additionalData) => {
  console.log("!user");
  if (!user) return;

  const userRef = datebaseMessages.ref(`users/2`);
  const snapshot = await userRef.get();
  // console.log(snapshot);

//   .on('value', snap => {
//     setState({data: snap.val()})
//     NumbersOfUsers(snap);
//     // timeTableFunction(snap);
// });
// console.log("snaphot");
// console.log(snapshot.exists);
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await datebaseMessages.ref(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
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