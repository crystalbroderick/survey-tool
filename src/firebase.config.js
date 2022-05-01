import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, GoogleAuthProvider } from "firebase/auth";


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
const auth = getAuth(app);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleAuthProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "Google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};


export {
  auth,
  db,
  logInWithEmailAndPassword,
  signInWithGoogle,
  sendPasswordReset,
  logout,
};

