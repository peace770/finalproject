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
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
  where,
  deleteDoc,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(?:[a-z0-9-]+\.)+[a-z]{2,})(?::\d{2,5})?(?:\/\S*)?$/i;

export const LoginContext = createContext();

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);

const db = getFirestore(app);

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

export async function SignUpWithEmailAndPassword(
  firstName,
  lastName,
  email,
  password
) {
  let userCredential = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  let user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    creator: false,
    name: {
      first: firstName,
      last: lastName,
    },
  });
}

// Signs-out .
export function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}
function getUid() {
  const { uid } = getAuth().currentUser || {};
  return uid || null;
}
// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!getAuth().currentUser;
}
async function getUserData(userId) {
  const q = query(doc(db, "users", userId));
  return await getDoc(q);
}
export async function saveLastComponent(courseId, componentId) {
  await updateDoc(
    doc(db, "users", getAuth().currentUser.uid, "userCourses", courseId),
    { lastComponent: componentId, lessonsLearned: arrayUnion(componentId) }
  );
}
export default function FirebaseContext({ children }) {
  const [LoginState, setLoginState] = useState(getAuth().currentUser);
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      getUserData(user.uid).then((data) => {
        let ndata = Object.assign(user, data.data());
        // console.log('old: ', data.data());
        // console.log('nw: ', ndata);
        setLoginState(ndata);
      });
    } else setLoginState(user);
  });


  return (
    <LoginContext.Provider value={LoginState}>{children}</LoginContext.Provider>
  );
}

export  function registerToCourse(courseId, userId) {
  let data = {
    lastComponent: "",
    lessonsLearned: [],
  };
  return setDoc(doc(db, "users", userId, "userCourses", courseId), data);
}
export function cancelCourseSubscription(courseId){
  return deleteDoc(doc(db, "users", getUid(), "userCourses", courseId))
}
function filterQueryByPublishedOrCreatorOfCourse(q, creator) {
  return (creator != null && getUid() == creator)
        ? query(q)
        : query(q, where("isPublished", "==", true));
}

export class Course {
  _id;
  _creator;
  _name;
  _chapterArr;
  _isPublished;
  _tags;
  _description;
  isChanged;

  constructor(creator, name, id, isPublished, tags, description) {
    if (typeof creator === "string") {
      this._creator = creator;
    } else {
      console.log(creator);
      throw new TypeError("creator must be a string");
    }
    if (typeof name === "string") {
      this._name = name;
    } else {
      throw new TypeError("name must be a string");
    }
    if (typeof id === "string") {
      this._id = id;
    } else {
      throw new TypeError("id must be astring");
    }
    this._chapterArr = [];
    this._isPublished = isPublished;
    this.isChanged = false;
    this._tags = new Set(tags);
    this._description = description;
  }

  // getters
  get chapters() {
    return this._chapterArr;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get isPublished() {
    return this._isPublished;
  }
  get description() {
    return this._description;
  }

  get creator() {
    return this._creator;
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
  set description(newDescription) {
    if (typeof newDescription === "string") {
      this._description = newDescription;
      this.isChanged = true;
      this.registerChange();
    } else {
      throw new TypeError("description must be a string");
    }
  }
  set isPublished(status) {
    this._isPublished = status;
    this.isChanged = true;
    this.registerChange();
  }

  async addTag(newTag) {
    //cheack DB for tags
    this._tags.add(newTag);
    this.isChanged = true;
  }

  async addNewChapter(name) {
    let data = {
      name: name,
      position: this._chapterArr.length + 1,
      isPublished: false,
    };
    let doc = await addDoc(
      collection(db, "courses", this._id, "chapters"),
      data
    );
    // create collection of components
    this.DBaddChapter(name, doc.id, data.position, data.isPublished);
    return true;
  }

  toChange() {
    return {
      name: {
        type: typeof "",
        onChange: (e) => {
          this.name = e.target.value;
        },
      },
      description: {
        type: typeof "",
        onChange: (e) => {
          this.description = e.target.value;
        },
      },
      isPublished: {
        type: "option",
        options: [`${true}`, `${false}`],
        onChange: (e) => {
          this.publish();
          // = e.target.value == `${true}`
        },
      },
    };
  }
  saveChanges(data) {
    return this.update();
  }
  DBaddChapter(name, id, position, isPublished) {
    if (typeof id != typeof "") throw new TypeError("id must be a string");
    this._chapterArr.push(
      new Chapter(
        name,
        position,
        this.registerChange.bind(this),
        id,
        this,
        isPublished
      )
    );
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
    var other = index + direction;
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
  componentsIterator(callback) {
    this.chapters.forEach((chapter) => {
      chapter.components.forEach((component) => {
        callback(component);
      });
    });
  }
  async _deleteChapter(index) {
    let chapter = this._chapterArr[index];
    let result = await chapter.deleteAllComponents(true);
    console.log(result);
    if (!result) return false;
    await deleteDoc(doc(db, "courses", this._id, "chapters", chapter._id));
    this._chapterArr.splice(index, 1);
    for (index; index < this._chapterArr; index++) {
      this._chapterArr[index].position = index + 1;
    }
    this.isChanged = true;
    return true;
  }

  deleteChapter(index, confirm) {
    //prompt(`deleteing is permanent and cannot be recovered, you can unpublish content instead. are you sure you want to delete?`)
    if (index < 0 || index >= this._chapterArr.length) {
      alert("trying to remove a nonIndex");
      return;
    }
    if (confirm == true) {
      return this._deleteChapter(index);
    } else {
      this._chapterArr[index].isPublished = false;
    }
  }

  new() {
    return this.addNewChapter("new");
  }
  delete() {
    return this.stupidlyDeleteCourse(true);
  }
  async update() {
    if (this.isChanged) {
      let courseRef = doc(db, "courses", this._id).withConverter(
        Course.Converter
      );
      await setDoc(courseRef, this);
      for (let chapter of this._chapterArr) {
        await chapter.update();
      }
      this.isChanged = false;
    }
    return true;
  }

  async fill() {
    const chaptersCollectionRef = collection(
      db,
      "courses",
      this._id,
      "chapters"
    );

    const q = filterQueryByPublishedOrCreatorOfCourse(chaptersCollectionRef, this.creator)

    const chapters = await getDocs(q);
    chapters.forEach((chapter) => {
      let { name, position, isPublished } = chapter.data();
      this.DBaddChapter(name, chapter.id, position, isPublished);
    });
    this.chapters.sort((a, b) => a.position - b.position);
    return true;
  }

  static Converter = {
    toFirestore: (course) => {
      return {
        creator: course._creator,
        name: course._name,
        isPublished: course._isPublished,
        tags: [...course._tags],
        description: course._description,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Course(
        data.creator,
        data.name,
        snapshot.id,
        data.isPublished,
        data.tags,
        data.description || ""
      );
    },
  };

  static async getAllCourses() {
    // return object with all the courses
    const q = query(collection(db, "courses")).withConverter(Course.Converter);
    const publishedOnly = filterQueryByPublishedOrCreatorOfCourse(q, null)
    return getDocs(publishedOnly);
  }

  static async getCoursesByCreatorId(userId) {
    // return object with all the courses
    const q = query(
      collection(db, "courses"),
      where("creator", "==", userId)
    ).withConverter(Course.Converter);
    let res = await getDocs(q);
    return res;
  }
  static async getUserCourses(userId) {
    
    const q = query(collection(db, "users", userId, "userCourses"));
    let { docs } = await getDocs(q);
    let courses = docs.map(async (doc) => {
      let course = await this.getCourse(doc.id);
      return Object.assign(course.data(), doc.data());
    });
    let result = await Promise.all(courses);
    return result;
  }

  static async getUserCourseData(userId, courseId) {
    const q = doc(db, "users", userId, "userCourses", courseId);
    return getDoc(q);
  }

  static async getCourse(courseId) {
    const q = doc(db, "courses", courseId).withConverter(Course.Converter);
    return getDoc(q);
  }

  static async buildCourse(courseId) {
    let course = await this.getCourse(courseId);
    course = course.data();
    await course.fill();

    for (let chapter of course.chapters) await chapter.fill();
    return course;
  }

  static async createNewCourse(courseName) {
    if (!getAuth().currentUser) throw new Error("you cant do this!");
    let data = {
      name: courseName,
      creator: getAuth().currentUser.uid,
      tags: [],
      isPublished: false,
      description: "",
    };
    let doc = await addDoc(collection(db, "courses"), data);
    return new Course(
      getAuth().currentUser.uid,
      data.name,
      doc.id,
      data.isPublished,
      data.tags,
      data.description
    );
  }

  async stupidlyDeleteCourse(confirm) {
    if (!confirm) return false;
    while (this._chapterArr.length > 0) {
      await this._deleteChapter(this._chapterArr.length - 1);
    }
    return deleteDoc(doc(db, "courses", this._id));
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
  course;
  extraMark = null;

  constructor(name, position, registerChange, id = "", course, isPublished) {
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
    if (typeof course === typeof {}) {
      this.course = course;
    } else {
      throw new TypeError("coursee must be a object (instance of Course)");
    }
    this._componentArr = [];
    this._isPublished = isPublished;
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
  get components() {
    return this._componentArr;
  }

  //methods
  async addNewComponent(name, type, url) {
    let data = {
      name: name,
      type: type,
      url: url,
      position: this._componentArr.length + 1,
      isPublished: false,
    };
    let doc = await addDoc(
      collection(
        db,
        "courses",
        this.course._id,
        "chapters",
        this._id,
        "components"
      ),
      data
    );
    this.DBaddComponent(
      name,
      type,
      url,
      doc.id,
      data.position,
      data.isPublished
    );
    return true;
  }

  DBaddComponent(name, type, url, id, position, isPublished) {
    if (typeof id === "string") {
      console.log(name, type, url, id, position);
      this._componentArr.push(
        new Component(
          name,
          position,
          type,
          url,
          this.registerComponentChange.bind(this),
          id,
          this,
          isPublished
        )
      );
    } else {
      throw new TypeError("id must be a string");
    }
  }
  delete() {
    return this.course.deleteChapter(this.position - 1, true);
  }
  new() {
    return this.addNewComponent("new component", "video", "");
  }
  async update() {
    if (this.isChanged) {
      let chapterRef = doc(
        db,
        "courses",
        this.course._id,
        "chapters",
        this.id
      ).withConverter(Chapter.Converter);
      await setDoc(chapterRef, this);
      for (let comp of this._componentArr) {
        await comp.update();
      }
      this.isChanged = false;
    }
    return true;
  }
  async fill() {
    const componentsCollectionRef = collection(
      db,
      "courses",
      this.course._id,
      "chapters",
      this.id,
      "components"
    );

    const q = filterQueryByPublishedOrCreatorOfCourse(componentsCollectionRef, this.course.creator);

    let docs = await getDocs(q);
    docs.forEach((comp) => {
      let data = comp.data();
      this.DBaddComponent(
        data.name,
        data.type,
        data.url,
        comp.id,
        data.position,
        data.isPublished
      );
    });
    this.components.sort((a, b) => a.position - b.position);
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
    var other = index + direction;
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
    await deleteDoc(
      doc(
        db,
        "courses",
        this.course._id,
        "chapters",
        this.id,
        "components",
        this._componentArr[index]._id
      )
    );
    this._componentArr.splice(index, 1);
    for (index; index < this._componentArr.length; index++) {
      this._componentArr[index].position = index + 1;
    }
    this.isChanged = true;
    this.registerChange();
    return true;
  }

  async deleteAllComponents(confirm) {
    if (confirm) {
      while (this._componentArr.length > 0) {
        await this._deleteComponent(this._componentArr.length - 1);
      }
      return true;
    }
    return false;
  }

  toChange() {
    return {
      name: {
        type: typeof this.name,
        onChange: (e) => {
          this.name = e.target.value;
        },
      },
      position: {
        type: typeof this.position,
        onChange: (e) => {
          let dir = e.target.value - this.position;
          this.course.reorder(this.position - 1, dir);
        },
      },
      isPublished: {
        type: "option",
        options: [`${true}`, `${false}`],
        onChange: (e) => {
          this.publish();
          // = e.target.value == `${true}`
        },
      },
    };
  }
  saveChanges(data) {
    return this.course.update();
  }
  deleteComponent(index, confirm) {
    if (index < 0 || index >= this._componentArr.length) {
      alert("trying to remove a nonIndex");
      return;
    }
    if (confirm == true) {
      return this._deleteComponent(index);
    } else {
      this._componentArr[index].isPublished = false;
    }
  }

  static Converter = {
    toFirestore: (chapter) => {
      return {
        name: chapter.name,
        position: chapter.position,
        isPublished: chapter.isPublished,
      };
    },
  };
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
  chapter;
  extraMark = null;

  constructor(
    name,
    position,
    type,
    url,
    registerChange,
    id = "",
    chapter,
    isPublished
  ) {
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
    if (urlRegex.test(url) || true) {
      this._url = url;
    } else {
      throw new Error("URL is invalid");
    }
    if (typeof chapter === typeof {}) {
      this.chapter = chapter;
    } else {
      throw new TypeError("chapter must be a object (instance of Chapter)");
    }
    this._isPublished = isPublished;
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
  delete() {
    return this.chapter.deleteComponent(this.position - 1, true);
  }
  async update() {
    if (this.isChanged) {
      let compRef = doc(
        db,
        "courses",
        this.chapter.course._id,
        "chapters",
        this.chapter.id,
        "components",
        this._id
      ).withConverter(Component.Converter);
      await setDoc(compRef, this);
      this.isChanged = false;
    }
    return true;
  }
  toChange() {
    return {
      name: {
        type: typeof this.name,
        onChange: (e) => {
          this.name = e.target.value;
        },
      },
      position: {
        type: typeof this.position,
        onChange: (e) => {
          let dir = e.target.value - this.position;
          this.chapter.reorder(this.position - 1, dir);
        },
      },
      type: {
        type: "option",
        options: ["video"],
        onChange: (e) => {
          this.type = e.target.value;
        },
      },
      url: {
        type: typeof this.url,
        onChange: (e) => {
          this.url = e.target.value;
        },
      },
      isPublished: {
        type: "option",
        options: [`${true}`, `${false}`],
        onChange: (e) => {
          this.isPublished = e.target.value == `${true}`;
        },
      },
    };
  }
  saveChanges(data) {
    return this.chapter.course.update();
  }

  static Converter = {
    toFirestore: (component) => {
      return {
        name: component._name,
        position: component._position,
        type: component._type,
        url: component._url,
        isPublished: component._isPublished,
      };
    },
  };
}
