document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('error');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (password.length !== 6 || !/^[a-zA-Z]+$/.test(password)) {
            errorElement.textContent = 'A senha deve ter  6 letras e conter apenas letras.';
            return;
        }

        errorElement.textContent = '';
        window.location.href = 'principal.html';
    });
});
