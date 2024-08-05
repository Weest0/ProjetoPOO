// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import chamarPopUpAviso from "./erroPopUp.js";
// TODO: Add SDKs for Firebase products that you want to use

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
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => { //DOMContentLoaded para deixar um pouco mais fluido.
    const formManga = document.getElementById('form-manga');
    const formAtualizarManga = document.getElementById('form-atualizar-manga');
    const listaMangas = document.getElementById('lista-mangas');
    const overlay = document.getElementById('overlay');
    const botaoFecharFormulario = document.getElementById('fechar');
    const botaoFecharAtualizarFormulario = document.getElementById('fechar-atualizar-form');
    const botaoAdicionarManga = document.getElementById('btn-adicionar');
    const botaoAbrirMenu = document.getElementById('btn-abrir-menu');
    const botaoSair = document.getElementById('btn-sair-usuario');
    const nomeUsuario = document.getElementById('nome-usuario');
    const imgLoading = document.getElementById('carregamento');
    const textoBotao = document.getElementById('texto-botao');
    const menuLateral = document.getElementById('menu-lateral');
    const barraNavegacao = document.getElementById('barra-de-navegacao');
    const imagemUsuario = document.getElementById('imagem-usuario');
    let usuarioGlobal;
    let aux = true;
    let auxMenu = true;

    //Aqui está cuidando de tudo relacionado a usuario
    onAuthStateChanged(auth, (user) => {
        if (user) {
            usuarioGlobal = user;
            exibirListaMangas(user.uid);
            const displayName = user.displayName || user.email;
            nomeUsuario.textContent = ' Bem-vindo, ' + displayName;
            const photoURL = user.photoURL || '../images/usuario.png';
            imagemUsuario.src = photoURL;
        } else {
            nomeUsuario.textContent = "Usuário não autenticado";
        }
    });

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

    botaoSair.addEventListener('click', () => {
        signOut(auth);
        window.location.href = 'index.html';
    });

    botaoAbrirMenu.addEventListener('click', () => {
        if(auxMenu){
            menuLateral.style.display = 'flex';
            menuLateral.style.left = '79%';
            barraNavegacao.style.width = '79%';
            listaMangas.style.width = '79%';
        } else {
            //menuLateral.style.animation = 'menu2 3s';
            menuLateral.style.left = '100%';
            barraNavegacao.style.width = '100%';
            listaMangas.style.width = '100%'
            setTimeout(()=>{
                menuLateral.style.display = 'none';
            }, 3000);
            
        }
        auxMenu =!auxMenu;
        
    });

    function configurarBotao(button, nome){
        button.value = nome;
        button.type = 'button';
    };


    function classesTexto(titulo, autor, ultimoCapituloLido, generoECategoria, status){
        titulo.className = 'label-titulo';
        autor.className = 'label-autor';
        ultimoCapituloLido.className = 'label-capitulo';
        generoECategoria.className = 'label-genero-categoria';
        status.className = 'label-status';
    };

    
    async function exibirListaMangas(userId){
        const caminhoColecao = collection(db, 'usuarios', userId, 'mangas');
        /* const querySnapshot = await getDocs(collection(db, 'usuarios', userId, 'mangas')); */
        listaMangas.innerHTML = '';

        const atualizarAutomaticamente = onSnapshot(caminhoColecao, (querySnapshot) => {
            querySnapshot.forEach((documento) => {
                const mangaData = documento.data();
                const manga = new Manga(
                    mangaData.titulo,
                    mangaData.autor,
                    mangaData.ultimoCapituloLido,
                    mangaData.linkImagem,
                    mangaData.genero,
                    mangaData.status,
                    mangaData.categoria
                );
    
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

                const botaoDeletar = document.createElement('input');
                const botaoEditar = document.createElement('input');
    
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

                botaoEditar.addEventListener('click', () => {
                    const novoCampoTitulo = document.getElementById('novo-campo-titulo');
                    const novoCampoAutor = document.getElementById('novo-campo-autor');
                    const novoCampoUltimoLido = document.getElementById('novo-campo-por-ultimo');
                    const novoCampoLinkImagem = document.getElementById('novo-campo-imagem');
                    const novaCategoria = document.getElementById('nova-categoria');
                    const novoStatus = document.getElementById('novo-status');
                    const novoGenero = document.getElementById('novo-genero');
                    const caminho = doc(db, 'usuarios', userId, 'mangas', documento.id);

                    novoCampoTitulo.value = manga.titulo;
                    novoCampoAutor.value = manga.autor;
                    novoCampoUltimoLido.value = manga.ultimoCapituloLido;
                    novoCampoLinkImagem.value = manga.linkImagem;
                    novaCategoria.value = manga.categoria;
                    novoStatus.value = manga.status;
                    novoGenero.value = manga.genero; 

                    if(aux){
                        formAtualizarManga.style.display = 'flex';
                        overlay.style.display = 'flex';
                    }
                    
                    botaoFecharAtualizarFormulario.addEventListener('click', () => {
                        formAtualizarManga.style.display = 'none';
                        overlay.style.display = 'none';
                        aux =! aux
                    });

                    try{
                        formAtualizarManga.addEventListener('submit', async (event) => {
                            event.preventDefault();
                    
                            let novosDados = {
                                titulo: novoCampoTitulo.value,
                                autor: novoCampoAutor.value,
                                ultimoCapituloLido: novoCampoUltimoLido.value,
                                linkImagem: novoCampoLinkImagem.value,
                                genero: novoGenero.value,
                                status: novoStatus.value,
                                categoria: novaCategoria.value
                            }
                    
                            await updateDoc(caminho, novosDados);
                            exibirListaMangas(userId);
                            formAtualizarManga.style.display = 'none';
                            overlay.style.display = 'none';
                        });
                    } catch(error){
                        console.error('Error', error.message);
                        chamarPopUpAviso(error.message, 'red');
                    }

                    
                });

                botaoDeletar.addEventListener('click', async () => {
                    try{
                        const caminho = doc(db, 'usuarios', userId, 'mangas', documento.id);
                        await deleteDoc(caminho);
                        chamarPopUpAviso('Excluido', 'green');
                        exibirListaMangas(userId);
                    } catch(error){
                        console.error('Error', error.message);
                        chamarPopUpAviso(error.message, 'red');
                    }

                });
                
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
        });
        
    };


    formManga.addEventListener('submit', async (event) => {
        event.preventDefault();

        if(usuarioGlobal){
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

            try{
                await addDoc(collection(db, 'usuarios', usuarioGlobal.uid, 'mangas'), {
                    titulo: novoManga.getTitulo(),
                    autor: novoManga.getAutor(),
                    ultimoCapituloLido: novoManga.getUltimoCapituloLido(),
                    linkImagem: novoManga.getLinkImagem(),
                    genero: novoManga.getGenero(),
                    status: novoManga.getStatus(),
                    categoria: novoManga.getCategoria()
                });
                chamarPopUpAviso('Adicionado com sucesso.', 'green');
                exibirListaMangas(usuarioGlobal.uid);
            } catch(error){
                console.error('Error', error.message);
                chamarPopUpAviso(error.message, 'red');
            }
            
            formManga.reset();
            formManga.style.display = 'none';
            overlay.style.display = 'none';
            abrirFormularioAux =! abrirFormularioAux;
        } else {
            chamarPopUpAviso('Nenhum usuário autenticado.', 'red');
        }
        
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
