/**
 * ============================================================
 * PERSONAL PORTFOLIO — LOGIN SCRIPT
 * ============================================================
 *
 * ⚠️  SECURITY NOTE (IMPORTANT):
 *    This is a FRONT-END DEMONSTRATION login only.
 *    Passwords are stored in plain text within this JavaScript file.
 *    This is NOT secure and MUST NOT be used in production.
 *
 *    A production system requires:
 *    • Server-side authentication (PHP, Node.js, etc.)
 *    • Password hashing (bcrypt, argon2, etc.)
 *    • Secure HTTP-only server-side sessions or JWT tokens
 *    • HTTPS everywhere
 *    • CSRF protection
 *    • Rate limiting / brute-force protection
 *
 *    Replace the credentials below with your own demo credentials.
 * ============================================================
 */

// ---- DEMO CREDENTIALS (Change these for your own demo) ----
const VALID_USERNAME = 'student';
const VALID_PASSWORD = '123456';
// -----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

    // ---- Dynamic Year ----
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---- Elements ----
    const form            = document.getElementById('loginForm');
    const usernameInput   = document.getElementById('username');
    const passwordInput   = document.getElementById('password');
    const toggleBtn       = document.getElementById('togglePassword');
    const toggleIcon      = document.getElementById('toggleIcon');
    const errorBox        = document.getElementById('loginError');
    const successBox      = document.getElementById('loginSuccess');
    const loginBtn        = document.getElementById('loginBtn');

    // ---- Show/Hide Password ----
    toggleBtn.addEventListener('click', function () {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleIcon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
        toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });

    // ---- Hide messages on input ----
    usernameInput.addEventListener('input', () => { hideMessages(); });
    passwordInput.addEventListener('input', () => { hideMessages(); });

    function hideMessages() {
        errorBox.classList.add('d-none');
        successBox.classList.add('d-none');
    }

    // ---- Form Submit ----
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        hideMessages();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const remember = document.getElementById('rememberMe').checked;

        // Validate empty fields
        if (!username) {
            showError('Please enter your username.');
            usernameInput.classList.add('is-invalid');
            return;
        }
        usernameInput.classList.remove('is-invalid');

        if (!password) {
            showError('Please enter your password.');
            passwordInput.classList.add('is-invalid');
            return;
        }
        passwordInput.classList.remove('is-invalid');

        // Disable button during check
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';

        // Simulate network delay (500ms)
        setTimeout(() => {
            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                // ---- Success ----
                // Store session
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('loggedInUser', username);

                // Remember Me
                if (remember) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                showSuccess();

                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1200);

            } else {
                // ---- Error ----
                showError('Invalid username or password. Please try again.');
            }

            loginBtn.disabled = false;
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i>Sign In';
        }, 500);
    });

    function showError(msg) {
        document.getElementById('errorText').textContent = msg;
        errorBox.classList.remove('d-none');
        successBox.classList.add('d-none');
    }

    function showSuccess() {
        successBox.classList.remove('d-none');
        errorBox.classList.add('d-none');
    }

    // ---- Load Remembered Username ----
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
        usernameInput.value = remembered;
        document.getElementById('rememberMe').checked = true;
    }
});

function showForgotHint(e) {
    e.preventDefault();
    alert('This is a demo login page.\n\nDemo credentials:\nUsername: student\nPassword: 123456\n\nNote: This is a front-end only demo.\nReal authentication requires a backend server.');
}