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
  deleteDoc,
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
  const q = query(collection(db, "courses"), where("creator", "==", userId));
  return getDocs(q);
}
export async function getCourse(courseId) {
  //return all the chapters
  const q = query(collection(db, "courses", courseId, "chapters"));
  return getDocs(q);
}

export async function getChapter(courseId, chapterID) {
  // return all components of a chapter
  const q = query(
    collection(db, "courses", courseId, "chapters", chapterID, "components")
  );
  return getDocs(q);
}

export async function createNewCourse(courseName) {
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  return addDoc(collection(db, "courses"), {
    name: courseName,
    creator: getAuth().currentUser.uid,
  });
}

export async function createNewChapter(courseId, chapterName, position) {
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  return addDoc(collection(db, "courses", courseId, "chapters"), {
    name: chapterName,
    position: position,
  });
}

export async function createNewComponent(
  courseId,
  chapterId,
  componentName,
  type,
  position
) {
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  return addDoc(
    collection(db, "courses", courseId, "chapters", chapterId, "components"),
    {
      name: componentName,
      type: type,
      position: position,
    }
  );
}

async function updateComponentData(courseID, chapterID, componentID, data) {
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  let docRef = doc(
    db,
    "courses",
    courseID,
    "chapters",
    chapterID,
    "components",
    componentID
  );
  return updateDoc(docRef, data);
}

async function updateChapterData(courseID, chapterID, data) {
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  let docRef = doc(db, "courses", courseID, "chapters", chapterID);
  return updateDoc(docRef, data);
}

async function updateCourseData(courseID, data) {
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  let docRef = doc(db, "courses", courseID);
  return updateDoc(docRef, data);
}

export function updateCourse(course) {
  //TODO: update arr to real names
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  var q = { queue: 0, errors: [] };
  for (let chapter of course.arr) {
    if (chapter.hasChanged) {
      q.queue += 1;
      updateChapterData(course.id, chapter.id, chapter)
        .then(() => {
          q.queue -= 1;
          chapter.hasChanged = false;
        })
        .catch((err) =>
          q.errors.push({ in: "chapter", id: chapter.id, error: err })
        );
    }
    for (let comp of chapter.arr) {
      {
        if (comp.hasChanged) {
          q.queue += 1;
          updateComponentData(course.id, chapter.id, comp.id, comp)
            .then(() => {
              q.queue -= 1;
              comp.hasChanged = false;
            })
            .catch((err) =>
              q.errors.push({ in: "component", id: comp.id, error: err })
            );
        }
      }
    }
  }
}

export async function deleteComponent(courseID, chapterID, componentID) {
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  return deleteDoc(doc(db, 'courses', courseID, 'chapters', chapterID, 'components', componentID));
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
