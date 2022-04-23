import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD_jdtKfxF0zStDJZEAu9wXM8w28igHwic",
  authDomain: "survey-tool-5afd9.firebaseapp.com",
  projectId: "survey-tool-5afd9",
  storageBucket: "survey-tool-5afd9.appspot.com",
  messagingSenderId: "892640874400",
  appId: "1:892640874400:web:ad7b103c19d025e0b89ec5",
  measurementId: "G-MQKEM83SXY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();

