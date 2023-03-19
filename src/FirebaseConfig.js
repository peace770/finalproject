// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
