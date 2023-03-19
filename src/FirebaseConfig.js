// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const urlRegex =
  /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(?:[a-z0-9-]+\.)+[a-z]{2,})(?::\d{2,5})?(?:\/\S*)?$/i;
const config = {
  apiKey: "AIzaSyB2Zlx-qFhOTBvOuNz6PlzC3dbho_L-GSk",
  authDomain: "learn-torah-site.firebaseapp.com",
  projectId: "learn-torah-site",
  storageBucket: "learn-torah-site.appspot.com",
  messagingSenderId: "925135517325",
  appId: "1:925135517325:web:0db477839e55a7837d94c4",
};

export default function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
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

  addChapter(name) {
    this.chapterArr.push(
      new Chapter(
        name,
        this.chapterArr.length + 1,
        this.registerChange.bind(this)
      )
    );
    this.isChanged = true;
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

  _deleteChapter(index){
    //prompt(`deleteing is permanent and cannot be recovered, you can unpublish content instead. are you sure you want to delete?`)
    if (index < 0 || index >= this._chapterArr.length){
      alert("trying to remove a nonIndex");
      return;
    }
    this._chapterArr.splice(index, 1);
    for (index; index < this._chapterArr; index++) {
      this._chapterArr[index].position = index+1;
    }
    this.isChanged = true;
  }

  delete(index, confirm){
    if (confirm == true){
      this._deleteChapter(index)
    }
    else {
      this._chapterArr[index].isPublished = false;
    }
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
  addComponent(name, type, url) {
    this._componentArr.push(
      new Component(
        name,
        this._componentArr.length + 1,
        type,
        url,
        this.registerComponentChange.bind(this)
      )
    );
    this.isChanged = true;
    this.registerChange();
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

  _deleteComponent(index){
    if (index < 0 || index >= this._componentArr.length){
      alert("trying to remove a nonIndex");
      return;
    }
    this._componentArr.splice(index, 1);
    for (index; index < this._componentArr.length; index++) {
      this._componentArr[index].position = index+1;
    }
    this.isChanged = true;
    this.registerChange();
  }
  
  delete(index, confirm){
    if (confirm == true){
      this._deleteComponent(index)
    }
    else {
      this._componentArr[index].isPublished = false;
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
}
