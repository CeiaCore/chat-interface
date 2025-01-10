// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwrI957JRNSKMTIoHb2weD8xcOvBjZUy0",
  authDomain: "energygpt-46d3c.firebaseapp.com",
  projectId: "energygpt-46d3c",
  storageBucket: "energygpt-46d3c.appspot.com",
  messagingSenderId: "125919184854",
  appId: "1:125919184854:web:8fdb0e68f77124fa598677",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
