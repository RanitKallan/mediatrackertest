import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4zuY75vn1Bd3AzlOZa_lm96fwOv_f4LA",
  authDomain: "anime-list-bd85c.firebaseapp.com",
  projectId: "anime-list-bd85c",
  storageBucket: "anime-list-bd85c.firebasestorage.app",
  messagingSenderId: "885351876176",
  appId: "1:885351876176:web:1787abbca8bf82dd46b355",
  measurementId: "G-FR303VC5Z0"
};
function checkAuthState() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in, proceed to the website
          window.location.href = ".../index.html";
        } else {
          // No user is signed in, stay on the login page
        }
      });
    }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);