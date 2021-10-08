
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseApp= initializeApp ({
  apiKey: "AIzaSyDmudhySBgBoYlXY19Zus00u4pq-61lj3I",
  authDomain: "test-app-1694a.firebaseapp.com",
  projectId: "test-app-1694a",
  storageBucket: "test-app-1694a.appspot.com",
  messagingSenderId: "832573894272",
  appId: "1:832573894272:web:6acf9a147ef20d850b8065"
});

// Initialize Firebase
export const fire = getAuth()
export default firebaseApp