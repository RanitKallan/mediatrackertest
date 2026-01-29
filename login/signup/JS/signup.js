import { auth, db } from "./firebase-init.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const emailInput = document.getElementById("signupEmail");
  const passInput = document.getElementById("signupPassword");
  const confirmInput = document.getElementById("confirmPassword");
  const errorMessage = document.getElementById("signup-error-message");

  // Password toggle
  document.querySelectorAll(".password-toggle").forEach(toggle => {
    toggle.addEventListener("click", function () {
      const input = this.parentElement.querySelector('input[type="password"], input[type="text"]');
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        this.textContent = "🙈";
      } else {
        input.type = "password";
        this.textContent = "👁️";
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    const email = emailInput.value.trim();
    const password = passInput.value;
    const confirm = confirmInput.value;

    if (!email || !password || !confirm) {
      errorMessage.textContent = "Please fill in all fields.";
      return;
    }
    if (password !== confirm) {
      errorMessage.textContent = "Passwords do not match.";
      return;
    }
    if (password.length < 6) {
      errorMessage.textContent = "Password must be at least 6 characters.";
      return;
    }

    const btn = form.querySelector("button");
    const oldBtnText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Creating Account...";

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Optional: create a user doc
      await setDoc(doc(db, "users", cred.user.uid), {
        createdAt: Date.now()
      });

      window.location.href = "anime.html";
    } catch (err) {
      errorMessage.textContent = err.message;
      btn.disabled = false;
      btn.textContent = oldBtnText;
    }
  });
});
