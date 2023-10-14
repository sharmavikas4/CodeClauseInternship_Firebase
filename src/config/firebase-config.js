import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider,PhoneAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDLk_pzVHFBF_USoaay2TZQDneyvglSZrU",
  authDomain: "fir-3f236.firebaseapp.com",
  projectId: "fir-3f236",
  storageBucket: "fir-3f236.appspot.com",
  messagingSenderId: "152032300206",
  appId: "1:152032300206:web:243b411270c93b0ea2713f",
  measurementId: "G-CWZS2S3PN2"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const phoneProvider = new PhoneAuthProvider();