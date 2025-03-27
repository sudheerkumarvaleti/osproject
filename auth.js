// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const toggleRegister = document.getElementById('toggleRegister');

// Show/Hide Forms
function showLogin() {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    forgotPasswordForm.classList.add('hidden');
    loginTab.classList.add('border-b-2', 'border-blue-500', 'text-blue-500');
    registerTab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-500');
}

function showRegister() {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    forgotPasswordForm.classList.add('hidden');
    registerTab.classList.add('border-b-2', 'border-blue-500', 'text-blue-500');
    loginTab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-500');
}

function showForgotPassword() {
    forgotPasswordForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
}

// Event Listeners
loginTab.addEventListener('click', showLogin);
registerTab.addEventListener('click', showRegister);
toggleRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showRegister();
});
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showForgotPassword();
});

// Handle Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store logged in user
        sessionStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email
        }));
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
});

// Handle Register
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered');
        return;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message and switch to login
    alert('Account created successfully! Please login.');
    showLogin();
    registerForm.reset();
});

// Handle Forgot Password
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);

    if (user) {
        // In a real application, you would send a password reset email
        // For demo purposes, we'll just show the password
        alert(`For demo purposes, your password is: ${user.password}`);
        showLogin();
    } else {
        alert('Email not found');
    }
});

// Check if user is already logged in
function checkAuth() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'index.html';
    }
}

// Run auth check when page loads
checkAuth(); 