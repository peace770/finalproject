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
  getDocs,
  where,
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
const app = initializeApp(firebaseAppConfig);

const db = getFirestore(app);

export async function getAllCourses() {
  // return object with all the courses
  const q = query(collection(db, "courses"));
  return getDocs(q);
}
export async function getCoursesByUserId(userId) {
  // return object with all the courses
  const q = query(collection(db, "courses"), where('creator', '==', userId));
  return getDocs(q);
}
export async function getCourse(courseId){
  //return all the chapters
  const q = query(collection(db, "courses", courseId, 'chapters'));
  return getDocs(q);
}

export async function getChapter(courseId, chapterID){
  // return all components of a chapter
  const q = query(collection(db, "courses", courseId, 'chapters', chapterID, 'components'));
  return getDocs(q);
}

export async function createNewCourse(courseName) {
  if (!getAuth().currentUser) throw new Error("you cant do this!")
  return addDoc(collection(db, "courses"), {
    name: courseName,
    creator: getAuth().currentUser.uid, 
  });
}

export async function createNewChapter(courseId, chapterName, position) {
  if (!getAuth().currentUser) throw new Error("you cant do this!")
  return addDoc(collection(db, "courses", courseId, 'chapters'), {
    name: chapterName,
    position:position, 
  });
}

export async function createNewComponent(courseId, chapterId, componentName, type, position) {
  if (!getAuth().currentUser) throw new Error("you cant do this!")
  return addDoc(collection(db, "courses", courseId, 'chapters', chapterId, 'components'), {
    name: componentName,
    type: type,
    position:position, 
  });
}
export async function updateComponentUrl(courseId, chapterId, componentId, newURL) {
  if (!getAuth().currentUser) throw new Error("you cant do this!")
  let componentRef = doc(db, "courses", courseId, 'chapters', chapterId, 'components', componentId);
  return updateDoc(componentRef, {
    url: newURL, 
  });
}

export function updateListOrder(collectionPathArray, docs) {
  if (!getAuth().currentUser) throw new Error("you cant do this!")
  docs.forEach((d) => {
    let docRef = doc(db, ...collectionPathArray, d.id)
    updateDoc(docRef, {
    position:d.position, 
    })
  })
}


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
  onAuthStateChanged(getAuth(), (user) => setLoginState(user));

  return (
    <LoginContext.Provider value={LoginState}>{children}</LoginContext.Provider>
  );
}
