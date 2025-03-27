// Tab switching functionality
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('border-b-2', 'border-blue-500', 'text-blue-500');
    registerTab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-500');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('border-b-2', 'border-blue-500', 'text-blue-500');
    loginTab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-500');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // In a real application, you would validate credentials against a backend
    // For demo purposes, we'll use localStorage to simulate user authentication
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store authentication state
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name }));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name }));
        }
        
        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // In a real application, you would send this data to a backend
    // For demo purposes, we'll store in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered');
        return;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message and switch to login form
    alert('Account created successfully! Please login.');
    
    // Clear registration form
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';

    // Switch to login tab
    loginTab.click();
}

// Check if user is already logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || 'null');
    if (user && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'index.html';
    }
}

// Run auth check when page loads
checkAuth(); 