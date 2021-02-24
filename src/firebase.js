import firebase from 'firebase/app'
import 'firebase/firestore'
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDLMHFl1NuE9vWT5bOwgPeOAN-VtoM8iu0",
    authDomain: "primer-proyecto-con-react.firebaseapp.com",
    projectId: "primer-proyecto-con-react",
    storageBucket: "primer-proyecto-con-react.appspot.com",
    messagingSenderId: "33254944131",
    appId: "1:33254944131:web:4d98eb0da821ca7f6e9ab6",
    measurementId: "G-FVQLVVQ11Q"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();
