import React from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyAu7AJN6b4MYF2_zOlgYky7QKXkvQZireA",
  authDomain: "login-topfoodye.firebaseapp.com",
  projectId: "login-topfoodye",
  storageBucket: "login-topfoodye.appspot.com",
  messagingSenderId: "424177669691",
  appId: "1:424177669691:web:f4a36d104f24f00f3eae1e",
  measurementId: "G-WD66MC56EK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function FirebaseConfig() {
  return (
    <div>
      {/* El código original no tiene una salida visual para representar */}
    </div>
  );
}

export {app, auth};
export default FirebaseConfig;
