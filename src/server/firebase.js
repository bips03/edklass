import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyC7z6RBxFnGIPQ5d2AzmKBy_OVrky6rauI",
  authDomain: "ed-klass.firebaseapp.com",
  databaseURL:
    "https://ed-klass-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ed-klass",
  storageBucket: "ed-klass.appspot.com",
  messagingSenderId: "31466156342",
  appId: "1:31466156342:web:35927cc80ecfc023ae8397",
  measurementId: "G-9NM3WXHW2L",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
