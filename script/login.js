import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import chamarPopUpAviso from "./erroPopUp.js";
// Importações direto do firebase, assim como é usado na documentação
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHxgtdoV8OiU0zjdNfd_M3hLpuWd1JHZU",
  authDomain: "projetopoo-a79d3.firebaseapp.com",
  projectId: "projetopoo-a79d3",
  storageBucket: "projetopoo-a79d3.appspot.com",
  messagingSenderId: "612931106877",
  appId: "1:612931106877:web:c3ccd33cf7c8aa2219d254",
  measurementId: "G-9W98W96G4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const caracteresParaSenha = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
const caracteresParaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('error');

    //DOM
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');

    function verificarSeCredenciaisSaoValidas(){
        let senhaCaracteresValidos = caracteresParaSenha.test(senha.value);
        let emailCaracteresValidos = caracteresParaEmail.test(email.value);
        return(senha.value.length >= 6 && senha.value.length <= 10 && senhaCaracteresValidos && emailCaracteresValidos);
    }
    
    function validarCadastro(){
        if (verificarSeCredenciaisSaoValidas()) {
            errorElement.textContent = '';
            window.location.href = 'principal.html';  
            
        } else {
            throw new Error('Precisa ter um email valido e uma senha valida.');
        }
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        try{
            validarCadastro();
        } catch(e){
            console.error('Erro: ', e.message);
            errorElement.textContent = 'A senha deve ter de 6 a 10 caracteres e conter algum caracter especial.';
            chamarPopUpAviso('Verifique email e senha, e tente novamente', 'red');
        }
    });
});
