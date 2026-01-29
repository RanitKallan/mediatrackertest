import { auth } from "./firebase-init.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("login-error-message");

  // Password toggle (keeps your 👁️)
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
    const password = passwordInput.value;

    if (!email || !password) {
      errorMessage.textContent = "Please enter email and password.";
      return;
    }

    const btn = form.querySelector("button");
    const oldBtnText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Signing In...";

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Send user to anime page after login
      window.location.href = "anime.html";
    } catch (err) {
      errorMessage.textContent = err.message;
      btn.disabled = false;
      btn.textContent = oldBtnText;
    }
  });
});
