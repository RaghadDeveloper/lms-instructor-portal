import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA_YuEKS9uoQ5DVd_vLdxZ5WcDqhH2DZtY",
  authDomain: "learning-management-syst-a527d.firebaseapp.com",
  projectId: "learning-management-syst-a527d",
  storageBucket: "learning-management-syst-a527d.appspot.com",
  messagingSenderId: "553831538028",
  appId: "1:553831538028:web:3b9a62bfcbb3c6b2cf6749",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
