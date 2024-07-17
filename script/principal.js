// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import chamarPopUpAviso from "./erroPopUp.js";
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

document.addEventListener('DOMContentLoaded', () => { //DOMContentLoaded para deixar um pouco mais fluido.
    const formManga = document.getElementById('form-manga');
    const listaMangas = document.getElementById('lista-mangas');
    const overlay = document.getElementById('overlay');
    const botaoFecharFormulario = document.getElementById('fechar');
    const botaoAdicionarManga = document.getElementById('btn-adicionar');
    let vetorMangas = [];
    let emQualEsta = null;

    class Manga {
        constructor(titulo, autor, ultimoCapituloLido, linkImagem, genero, status, categoria) {
            this.titulo = titulo;
            this.autor = autor;
            this.ultimoCapituloLido = ultimoCapituloLido;
            this.linkImagem = linkImagem;
            this.genero = genero;
            this.status = status;
            this.categoria = categoria;
        }

        getTitulo() {
            return this.titulo;
        }
    
        setTitulo(novoTitulo) {
            this.titulo = novoTitulo;
        }
    
        getAutor() {
            return this.autor;
        }
    
        setAutor(novoAutor) {
            this.autor = novoAutor;
        }
    
        getUltimoCapituloLido() {
            return this.ultimoCapituloLido;
        }
    
        setUltimoCapituloLido(novoUltimoCapituloLido) {
            this.ultimoCapituloLido = novoUltimoCapituloLido;
        }
    
        getLinkImagem() {
            return this.linkImagem;
        }
    
        setLinkImagem(novoLinkImagem) {
            this.linkImagem = novoLinkImagem;
        }
    
        getGenero() {
            return this.genero;
        }
    
        setGenero(novoGenero) {
            this.genero = novoGenero;
        }
    
        getStatus() {
            return this.status;
        }
    
        setStatus(novoStatus) {
            this.status = novoStatus;
        }
    
        getCategoria() {
            return this.categoria;
        }
    
        setCategoria(novaCategoria) {
            this.categoria = novaCategoria;
        }
        
    };

    botaoFecharFormulario.addEventListener('click', () => {
        formManga.style.display = 'none';
        overlay.style.display = 'none';
        abrirFormularioAux =! abrirFormularioAux;
    })

    function configurarBotao(button, nome){
        button.value = nome;
        button.type = 'button';
    };

    function deletarManga(index){
        vetorMangas.splice(index, 1);
        exibirListaMangas();
    }

    function editarManga(index){
        const manga = vetorMangas[index];

        document.getElementById('campo-titulo').value = manga.titulo;
        document.getElementById('campo-autor').value = manga.autor;
        document.getElementById('campo-por-ultimo').value = manga.ultimoCapituloLido;
        document.getElementById('campo-imagem').value = manga.linkImagem;
        document.getElementById('genero').value = manga.genero;
        document.getElementById('status').value = manga.status;
        document.getElementById('categoria').value = manga.categoria;
        botaoFecharFormulario.style.display = 'none';
        botaoAdicionarManga.textContent = 'Atualizar Mangá';

        emQualEsta = index;
        formManga.style.display = 'flex';
        overlay.style.display = 'flex';
        abrirFormularioAux = false;
    }

    function classesTexto(titulo, autor, ultimoCapituloLido, generoECategoria, status){
        titulo.className = 'label-titulo';
        autor.className = 'label-autor';
        ultimoCapituloLido.className = 'label-capitulo';
        generoECategoria.className = 'label-genero-categoria';
        status.className = 'label-status';
    }


    function exibirListaMangas(){
        listaMangas.innerHTML = '';
        vetorMangas.forEach((manga, index) => {
            const imagem = document.createElement('img');
            const card = document.createElement('div');
            const cardLadoDireito = document.createElement('div');
            const cardImagem = document.createElement('div');
            const cardTexto = document.createElement('div');
            const cardBotao = document.createElement('div');

            const labelTitulo = document.createElement('label');
            const labelAutor = document.createElement('label');
            const labelUltimoCapLido = document.createElement('label');
            const labelGeneroECategoria = document.createElement('label');
            const labelStatus = document.createElement('label');

            const botaoEditar = document.createElement('input');
            botaoEditar.addEventListener('click', () => editarManga(index));
            const botaoDeletar = document.createElement('input');
            botaoDeletar.addEventListener('click', () => deletarManga(index));

            configurarBotao(botaoEditar, 'Editar');
            configurarBotao(botaoDeletar, 'Deletar');

            (manga.status === 'Lendo') ? labelStatus.style.backgroundColor = 'green' : labelStatus.style.backgroundColor = 'red'; 

            labelTitulo.innerHTML = `Titulo: ${manga.titulo}`;
            (manga.autor === '') ? labelAutor.innerHTML = 'Autor: Desconhecido' : labelAutor.innerHTML = `Autor: ${manga.autor}`;
            labelUltimoCapLido.innerHTML = `Ultimo capitulo lido: ${manga.ultimoCapituloLido}`;
            labelGeneroECategoria.innerHTML = `${manga.genero} · ${manga.categoria}`;
            labelStatus.innerHTML = `${manga.status}`;
            (manga.linkImagem === '') ? imagem.src = '' : imagem.src = manga.linkImagem;

            
            cardTexto.appendChild(labelTitulo);
            cardTexto.appendChild(labelAutor);
            cardTexto.appendChild(labelGeneroECategoria);
            cardTexto.appendChild(labelUltimoCapLido);
            cardTexto.appendChild(labelStatus);
            cardLadoDireito.appendChild(cardTexto);
            cardLadoDireito.appendChild(cardBotao);
            
            cardImagem.appendChild(imagem);
            cardBotao.appendChild(botaoEditar);
            cardBotao.appendChild(botaoDeletar);
            card.appendChild(cardImagem);
            card.appendChild(cardLadoDireito);
            listaMangas.appendChild(card);
            
            card.className = 'card';
            imagem.className = 'imagem';
            cardImagem.className = 'card-imagem'
            cardTexto.className = 'card-texto';
            cardLadoDireito.className = 'card-lado-direito';
            botaoDeletar.className = 'botao-acao';
            botaoEditar.className = 'botao-acao';
            cardBotao.className = 'card-botao';
            classesTexto(labelTitulo, labelAutor, labelUltimoCapLido, labelGeneroECategoria, labelStatus);
        });
    };

    formManga.addEventListener('submit', (event) => {
        event.preventDefault();

        const campoTitulo = document.getElementById('campo-titulo');
        const campoAutor = document.getElementById('campo-autor');
        const campoUltimoLido = document.getElementById('campo-por-ultimo');
        const campoLinkImagem = document.getElementById('campo-imagem');
        const categoria = document.getElementById('categoria');
        const status = document.getElementById('status');
        const genero = document.getElementById('genero');

        const novoManga = new Manga(
            campoTitulo.value,
            campoAutor.value,
            campoUltimoLido.value,
            campoLinkImagem.value,
            genero.options[genero.selectedIndex].text,
            status.options[status.selectedIndex].text,
            categoria.options[categoria.selectedIndex].text
        );

        if (emQualEsta === null) {
            vetorMangas.push(novoManga);
        } else {
            vetorMangas[emQualEsta] = novoManga;
            emQualEsta = null;
        }

        exibirListaMangas();
        formManga.reset();
        formManga.style.display = 'none';
        overlay.style.display = 'none';
        abrirFormularioAux =! abrirFormularioAux;
        
    });

    
    const botaoAbrirFormulario = document.getElementById('btn-abrir-form');
    let abrirFormularioAux = true;
    botaoAbrirFormulario.addEventListener('click', () => {
        formManga.reset();
        botaoFecharFormulario.style.display = 'flex';
        botaoAdicionarManga.textContent = 'Adicionar Mangá';
        (abrirFormularioAux) ? overlay.style.display = 'flex' : overlay.style.display = 'none';
        (abrirFormularioAux) ? formManga.style.display = 'flex' : formManga.style.display = 'none';
        abrirFormularioAux =! abrirFormularioAux;
    });
    
});
