import React, { createContext, useEffect, useState } from "react";
import getFirebaseConfig from "../FirebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getPerformance } from "firebase/performance";

export const LoginContext = createContext();

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

// Signs-in with google.
export async function signInWithGoogle() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

export async function signInWithPassword(email, password) {
    // Sign in Firebase using email and password.
    await signInWithEmailAndPassword(getAuth(), email, password);
  }

// Signs-out .
export function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

export function getProfilePicUrl() {
  if (isUserSignedIn()) return getAuth().currentUser.photoURL;
  else return "public/profile_placeholder.png";
}

// Returns the signed-in user's display name.
export function getUserName() {
  if (isUserSignedIn()) return getAuth().currentUser.displayName;
  else return "Profile";
}

export default function FirebaseContext({ children }) {
  const [LoginState, setLoginState] = useState(getAuth().currentUser);
  useEffect(()=> console.log(LoginState), [LoginState]);
console.log(getAuth());
  onAuthStateChanged(getAuth(), (user) => setLoginState(!!user));

  return (
    <LoginContext.Provider value={LoginState}>{children}</LoginContext.Provider>
  );
}
