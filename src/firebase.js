// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBmLyNp_KlwH4SlHTkmz6EvgysEmXAteYo",
  authDomain: "chatbox-3243c.firebaseapp.com",
  databaseURL: "https://chatbox-3243c-default-rtdb.firebaseio.com",
  projectId: "chatbox-3243c",
  storageBucket: "chatbox-3243c.appspot.com",
  messagingSenderId: "869381154556",
  appId: "1:869381154556:web:05d048c48dad2832505979",
  measurementId: "G-BTTRH5GB43"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db
