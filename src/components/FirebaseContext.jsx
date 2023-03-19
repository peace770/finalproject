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

const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(?:[a-z0-9-]+\.)+[a-z]{2,})(?::\d{2,5})?(?:\/\S*)?$/i;

export const LoginContext = createContext();

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);

const db = getFirestore(app);


export async function createNewCourse(courseName) {
  if (!getAuth().currentUser) throw new Error("you cant do this!");
  let doc = await addDoc(collection(db, "courses"), {
    name: courseName,
    creator: getAuth().currentUser.uid,
  });
  return new Course(getAuth().currentUser.uid, courseName, doc.id);
}
export










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

/***** */
// TODO: delete(0.5), ?flagsOfChange(all)?, finish (course, chapter),
/****** */

export class Course {
  _id;
  _creator;
  _Name;
  _chapterArr;
  _isPublished;
  _tags;
  isChanged;

  constructor(creator, name, id) {
    this._creator = creator;
    this._name = name;
    this._id = id;
    this._chapterArr = [];
    this._isPublished = false;
    this.isChanged = false;
    this._tags = new Set();
  }

  //setters

  async addNewChapter(name) {
    let doc = await addDoc(collection(db, "courses", courseId, "chapters"), {
      name: name,
      position: this.chapterArr.length + 1,
    });
    this.DBaddChapter(name, doc.id);
    return true;
  }

  DBaddChapter(name, id) {
    if (typeof id === "string") {
      this.chapterArr.push(
        new Chapter(
          name,
          this.chapterArr.length + 1,
          this.registerChange.bind(this),
          id
        )
      );
    } else {
      throw new TypeError("id must be a string");
    }
  }

  publish() {
    this.isPublished = !this._isPublished;
  }

  registerChange() {
    if (!this.isChanged) {
      this.isChanged = true;
    }
  }

  reorder(index, direction) {
    //asumming that postion 1 is the topmost and n-1 is the lowest position
    var other = direction == `down` ? index + 1 : index - 1;
    if (other < 0 || other >= this._chapterArr.length) {
      return;
    }
    [this._chapterArr[index], this._chapterArr[other]] = [
      this._chapterArr[other],
      this._chapterArr[index],
    ];
    [this._chapterArr[index].position, this._chapterArr[other].position] = [
      this._chapterArr[other].position,
      this._chapterArr[index].position,
    ];
    this.isChanged = true;
  }

  async _deleteChapter(index) {
    let result = await this._chapterArr[index].deleteAllComponents(true);
    if (!result) return false;
    await deleteDoc(doc(db, 'courses', courseID, 'chapters', this._id));
    this._chapterArr.splice(index, 1);
    for (index; index < this._chapterArr; index++) {
      this._chapterArr[index].position = index + 1;
    }
    this.isChanged = true;
    return true
  }

  delete(index, confirm) {    
     //prompt(`deleteing is permanent and cannot be recovered, you can unpublish content instead. are you sure you want to delete?`)
     if (index < 0 || index >= this._chapterArr.length) {
      alert("trying to remove a nonIndex");
      return;
    }      
    if (confirm == true) {
      this._deleteChapter(index);
    } else {
      this._chapterArr[index].isPublished = false;
    }
  }
  async update(){
    if (this.isChanged){
      let courseRef = doc(db, "courses", this._id).withConverter(Course.Converter);
      await updateDoc(courseRef, this);
      for (let chapter of this._chapterArr) {
        await chapter.update()
      }
      this.isChanged = false;
    }
      return true
  }


  async fill(){
     const q = query(collection(db, "courses", this._id, "chapters"));
     const chapters = await getDocs(q);
    chapters.forEach(chapter => {
      let data = chapter.data();
      this.DBaddChapter(data.name, data.id);
    });
    return true;
  }

  static Converter = {
    toFirestore: (course) => {
      return {
        creator: course._creator,
        name: course._name,
        isPublished: course._isPublished,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Course(data.creator, data.name, snapshot.id);
    },
  }

  static async getAllCourses() {
    // return object with all the courses
    const q = query(collection(db, "courses"));
    return getDocs(q);
  }
  static async getCoursesByUserId(userId) {
    // return object with all the courses
    const q = query(collection(db, "courses"), where("creator", "==", userId));
    return getDocs(q);
  }
  static async stupidlyDeleteCourse(confirm){
    if (!confirm) return false;
    while (this._chapterArr.length > 0){
      await this._deleteChapter(this._chapterArr.length - 1);
    }
    return deleteDoc(doc(db, 'courses', this._id))
  }
}

export class Chapter {
  _id;
  _name;
  _position;
  _componentArr;
  _isPublished;
  isChanged;
  registerChange;

  constructor(name, position, registerChange, id = "") {
    if (typeof id === "string") {
      this._id = id;
    } else {
      throw new TypeError("id must be a string");
    }
    if (typeof name === "string") {
      this._name = name;
    } else {
      throw new TypeError("name must be a string");
    }
    if (typeof position === "number") {
      this._Position = position;
    } else {
      throw new TypeError("position  must be a number");
    }
    this._componentArr = [];
    this._isPublished = false;
    this.isChanged = false;
    this.registerChange = registerChange;
  }

  //setters
  set name(newName) {
    if (typeof newName === "string") {
      this._name = newName;
      this.isChanged = true;
      this.registerChange();
    } else {
      throw new TypeError("name must be a string");
    }
  }

  set position(newPosition) {
    if (typeof newPosition === "number") {
      this._position = newPosition;
      this.isChanged = true;
      this.registerChange();
    } else {
      throw new TypeError("Position must be a number");
    }
  }


  set isPublished(status) {
    this._isPublished = status;
    this.isChanged = true;
    this.registerChange();
  }

  //getters
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get position() {
    return this._Position;
  }
  get isPublished() {
    return this._isPublished;
  }

  //methods
  async addNewComponent(name, type, url) {
    let doc = await addDoc(
      collection(db, "courses", courseId, "chapters", chapterId, "components"),
      {
        name: name,
        type: type,
        url: url,
        position: this._componentArr.length + 1,
      }
    );
    this.DBaddComponent(name, type, url, doc.id);
    return true;
  }

  DBaddComponent(name, type, url, id) {
    if (typeof id === "string") {
      this._componentArr.push(
        new Component(
          name,
          this._componentArr.length + 1,
          type,
          url,
          this.registerComponentChange.bind(this),
          id
        )
      );
    } else {
      throw new TypeError("id must be a string");
    }
  }
  async update(){
    if (this.isChanged){
    let chapterRef = doc(db, "courses", courseID, 'chapters', this.id).withConverter(Chapter.Converter);
    await updateDoc(chapterRef, this);
    for (let comp of this._componentArr) {
      await comp.update()
    }
    this.isChanged = false;
    }
    return true
    }
  async fill(){
    const q = query(
      collection(db, "courses", courseId, "chapters", chapterID, "components")
    );
    let docs = await getDocs(q);
    docs.forEach(comp => {
      let data = comp.data();
      this.DBaddComponent(data.name, data.type, data.url, comp.id)
    });
    return true;
  }
  publish() {
    this.isPublished = !this._isPublished;
    this.isChanged = true;
    this.registerChange();
  }

  registerComponentChange() {
    if (!this.isChanged) {
      this.isChanged = true;
      this.registerChange();
    }
  }

  reorder(index, direction) {
    //asumming that postion 1 is the topmost and n-1 is the lowest position
    var other = direction == `down` ? index + 1 : index - 1;
    if (other < 0 || other >= this._componentArr.length) {
      alert("change out of bounds");
      return;
    }
    [this._componentArr[index], this._componentArr[other]] = [
      this._componentArr[other],
      this._componentArr[index],
    ];
    var tPos = this._componentArr[index].position;
    this._componentArr[index].updatePos(this._componentArr[other].position);
    this._componentArr[other].updatePos(tPos);
    this.isChanged = true;
    this.registerChange();
  }

  async _deleteComponent(index) {
    await deleteDoc(doc(
        db,
        "courses", courseID,
        "chapters", chapterID,
        "components", this._componentArr[index]._id)
    ); 
    this._componentArr.splice(index, 1);
    for (index; index < this._componentArr.length; index++) {
      this._componentArr[index].position = index + 1;
    }
    this.isChanged = true;
    this.registerChange();
    return true;
  }

  async deleteAllComponents(confirm){
    if (confirm){
      while (this._componentArr.length > 0){
        await this._deleteComponent(this._componentArr.length - 1)
      }
      return true
    }
    return false
  }
  delete(index, confirm) { 
    if (index < 0 || index >= this._componentArr.length) {
      alert("trying to remove a nonIndex");
      return;
    }  
    if (confirm == true) {
      this._deleteComponent(index);
    } else {
      this._componentArr[index].isPublished = false;
    }
  }
    static Converter = {
      toFirestore: (chapter) => {
          return {
            name: chapter._name,
            position: chapter._position,
            isPublished: chapter._isPublished,
          };
      },
      fromFirestore: (snapshot, options) => {
          const data = snapshot.data(options);
          return new Chapter(data.name, data.position,  snapshot.id);
      }
  }
}

export class Component {
  _id;
  _name;
  _position;
  _type;
  _url;
  _isPublished;
  isChanged;
  registerChange;

  constructor(name, position, type, url, registerChange, id = "") {
    if (typeof id === "string") {
      this._id = id;
    } else {
      throw new TypeError("id must be a string");
    }
    if (typeof name === "string") {
      this._name = name;
    } else {
      throw new TypeError("name must be a string");
    }
    if (typeof position === "number") {
      this._position = position;
    } else {
      throw new TypeError("Position must be a number");
    }
    if (typeof type === "string") {
      this._type = type;
    } else {
      throw new TypeError("type must be a string");
    }
    if (urlRegex.test(url)) {
      this._url = url;
    } else {
      throw new Error("URL is invalid");
    }
    this._isPublished = false;
    this.isChanged = false;
    this.registerChange = registerChange;
  }

  //setters
  set name(newName) {
    if (typeof newName === "string") {
      this._name = newName;
      this.isChanged = true;
      this.registerChange();
    } else {
      throw new TypeError("name must be a string");
    }
  }

  set position(newPosition) {
    if (typeof newPosition === "number") {
      this._position = newPosition;
      this.isChanged = true;
      this.registerChange();
    } else {
      throw new TypeError("Position must be a number");
    }
  }

  set type(newType) {
    if (typeof newType === "string") {
      this._type = newType;
      this.isChanged = true;
      this.registerChange();
    } else {
      throw new TypeError("type must be a string");
    }
  }

  set url(newUrl) {
    if (urlRegex.test(newUrl)) {
      this._url = newUrl;
      this.isChanged = true;
      this.registerChange();
    } else throw new Error("URL is invalid");
  }

  set isPublished(status) {
    this._isPublished = status;
    this.isChanged = true;
    this.registerChange();
  }

  //getters
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get position() {
    return this._position;
  }

  get type() {
    return this._type;
  }

  get url() {
    return this._url;
  }

  get isPublished() {
    return this._isPublished;
  }

  //methods
  publish() {
    this.isPublished = !this._isPublished;
    this.isChanged = true;
    this.registerChange();
  }

  changeContent(type, url) {
    this.type = type;
    this.url = url;
    this.isChanged = true;
    this.registerChange();
  }

  updatePos(position) {
    this.position = position;
    this.isChanged = true;
    this.registerChange();
  }
  
  async update(){
    if (this.isChanged){
      let compRef = doc(db, "courses", courseID, 'chapters', chapterID, 'components', this._id).withConverter(Component.Converter);
      await updateDoc(compRef, this);
      this.isChanged = false;
    }
      return true
  }

   
   }

