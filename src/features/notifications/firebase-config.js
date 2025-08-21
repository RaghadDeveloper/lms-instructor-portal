import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAu_wdvj3kCGmH0_tEUWxTbh6DpLbchiwM",
  authDomain: "pro005-new.firebaseapp.com",
  projectId: "pro005-new",
  storageBucket: "pro005-new.firebasestorage.app",
  messagingSenderId: "107689212762",
  appId: "1:107689212762:web:869710496b0f090d6f9163",
  measurementId: "G-JSP09K6QSM",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
