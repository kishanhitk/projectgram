import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCBfejjbmbkhyJRE1LIgxuw7AyAKIeI9wA",
  authDomain: "projectgram-1.firebaseapp.com",
  projectId: "projectgram-1",
  storageBucket: "projectgram-1.appspot.com",
  messagingSenderId: "537735641245",
  appId: "1:537735641245:web:baf1c8e90a165c7f9f3c74",
  measurementId: "G-1F6C1CC336",
};
export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
