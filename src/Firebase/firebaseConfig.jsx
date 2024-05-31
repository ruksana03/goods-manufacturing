import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgCoXj5FBGaW-wLlxzsM39Zns58Jt0xm4",
  authDomain: "goods-manufacturing.firebaseapp.com",
  projectId: "goods-manufacturing",
  storageBucket: "goods-manufacturing.appspot.com",
  messagingSenderId: "484988815713",
  appId: "1:484988815713:web:2457ae0a06c688c2f09d20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)