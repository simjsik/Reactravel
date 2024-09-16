// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2r8YKcLBRE6NjSyp49eSdns4T13dbI_c",
  authDomain: "reactrip-c60a2.firebaseapp.com",
  projectId: "reactrip-c60a2",
  storageBucket: "reactrip-c60a2.appspot.com",
  messagingSenderId: "286902375282",
  appId: "1:286902375282:web:423e69eafc0691ed5303eb",
  measurementId: "G-E9210ZXHKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);


export { auth, db };