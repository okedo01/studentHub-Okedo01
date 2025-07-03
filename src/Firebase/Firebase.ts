import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBY_R7TEnsCmVH6xGNHicBjLPyJH5GlAms",
  authDomain: "studenthub-e0cd0.firebaseapp.com",
  projectId: "studenthub-e0cd0",
  storageBucket: "studenthub-e0cd0.appspot.com", 
  messagingSenderId: "375977328163",
  appId: "1:375977328163:web:dfae0ac702a70e249e3b96",
  measurementId: "G-R7MGQQZKY9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
