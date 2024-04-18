


import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'





const firebaseConfig = {
  apiKey: "AIzaSyB6Lofu3yjgr8rYizBvo8cOP9uIWtUSYGA",
  authDomain: "am-fashion-23ea1.firebaseapp.com",
  databaseURL: "https://am-fashion-23ea1-default-rtdb.firebaseio.com",
  projectId: "am-fashion-23ea1",
  storageBucket: "am-fashion-23ea1.appspot.com",
  messagingSenderId: "714025738859",
  appId: "1:714025738859:web:63cc3d91628180044ec72e",
  measurementId: "G-MS5B0EW0Q1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;
