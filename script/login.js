import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import chamarPopUpAviso from "./erroPopUp.js";
// Importações direto do firebase, assim como é usado na documentação

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
    const formularioRegistro = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('error');
    const errorElementCadastro = document.getElementById('error-cadastro');

    //Aqui estão os elementos do html (index.html)
    const emaiCadastro = document.getElementById('email-cadastro');
    const senhaCadastro = document.getElementById('senha-cadastro');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const botaoAbrirCadastro = document.getElementById('botao-abrir-cadastro');
    const botaoAbrirEntrar = document.getElementById('botao-abrir-entrar');
    const areaPrincipalEntrar = document.getElementById('principal-entrar');
    const areaSecundariaEntrar = document.getElementById('secundario-entrar');
    const areaPrincipalCadastro = document.getElementById('principal-cadastro');
    const areaSecundariaCadastro = document.getElementById('secundario-cadastro')
    const areaEntrar = document.getElementById('area-entrar');
    const areaCadastro = document.getElementById('area-cadastro');

    //evento para frontend/style
    botaoAbrirCadastro.addEventListener('click', () => {
        areaPrincipalCadastro.style.display = 'flex';
        areaSecundariaCadastro.style.display = 'none';
        areaPrincipalEntrar.style.display = 'none';
        areaSecundariaEntrar.style.display = 'flex';
        areaEntrar.style.backgroundColor = '#780662';
        areaCadastro.style.backgroundColor = 'black';
        areaEntrar.style.width = '40%';
        areaCadastro.style.width = '60%';
    });

    //evento para a mesma coisa do anterior
    botaoAbrirEntrar.addEventListener('click', () =>{
        areaPrincipalCadastro.style.display = 'none';
        areaSecundariaCadastro.style.display = 'flex';
        areaPrincipalEntrar.style.display = 'flex';
        areaSecundariaEntrar.style.display = 'none';
        areaCadastro.style.backgroundColor = '#780662';
        areaEntrar.style.backgroundColor = 'black';
        areaEntrar.style.width = '60%';
        areaCadastro.style.width = '40%';
    });

    function verificarSeCredenciaisSaoValidas(){
        let senhaCaracteresValidos = caracteresParaSenha.test(senha.value);
        let emailCaracteresValidos = caracteresParaEmail.test(email.value);
        return(senha.value.length >= 6 && senha.value.length <= 10 && senhaCaracteresValidos && emailCaracteresValidos);
    }

    async function verificarSeEmailJaExiste(){    
        const arrayUsuario = await fetchSignInMethodsForEmail(auth, email.value); // Retorna dados que não da pra ler, mas sempre retorna se tiver um email correspondente.
        return arrayUsuario.length > 0
    }
    
    async function validarCadastro(){
        if(!verificarSeCredenciaisSaoValidas()) {
            throw new Error('Precisa ter um email valido e uma senha valida.');    
        }

        const emailExiste = await verificarSeEmailJaExiste();
        if(emailExiste){
            throw new Error('Email já resgistrado.');
        }

        try{
            await createUserWithEmailAndPassword(auth, email.value, senha.value);
            window.location.href = "principal.html";
        } catch(error){
            throw new Error('Erro ao criar usuário. ', error.message);
        }
    }

    async function realizarLogin(){
        try{
            await signInWithEmailAndPassword(auth, email.value, senha.value);
            window.location.href = "principal.html";
        } catch(error){
            throw new Error('Erro ao realizar login. ', error.message);
        }
    }

    formularioRegistro.addEventListener('submit', async (event) => {
        event.preventDefault();
        try{
            await validarCadastro(emaiCadastro.value, senhaCadastro.value);
        } catch(error){
            console.error('Erro: ', error.message);
            errorElementCadastro.textContent = error.message;
            chamarPopUpAviso(error.message, 'red');
        }
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        try{
            await realizarLogin(email.value, senha.value);
        } catch(error){
            console.error('Erro: ', error.message);
            errorElement.textContent = error.message;
            chamarPopUpAviso(error.message, 'red');
        }
    });

    onAuthStateChanged(auth, (user) => {
        if(user){
            window.location.href = 'principal.html';
        }
    });
});
