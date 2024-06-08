document.addEventListener('DOMContentLoaded', () => { //DOMContentLoaded para deixar um pouco mais fluido.
    const formManga = document.getElementById('form-manga');
    const listaMangas = document.getElementById('lista-mangas');
    let vetorMangas = [];

    class Manga {
        constructor(titulo, autor, ultimoCapituloLido, linkImagem, genero, status, categoria) {
            //this.id = Date.now();
            this.titulo = titulo;
            this.autor = autor;
            this.ultimoCapituloLido = ultimoCapituloLido;
            this.linkImagem = linkImagem;
            this.genero = genero;
            this.status = status;
            this.categoria = categoria;
        };
        
    };

    function exibirListaMangas(){
        listaMangas.innerHTML = '';
        vetorMangas.forEach(manga => {
            const imagem = document.createElement('img');
            const card = document.createElement('div');
            const cardImagem = document.createElement('div');
            const cardTexto = document.createElement('div');

            const labelTitulo = document.createElement('label');
            const labelAutor = document.createElement('label');
            const labelUltimoCapLido = document.createElement('label');
            const labelGeneroECategoria = document.createElement('label');
            const labelStatus = document.createElement('label');

            labelTitulo.innerHTML = `Titulo: ${manga.titulo}`;
            (manga.autor === '') ? labelAutor.innerHTML = 'Autor: Desconhecido' : labelAutor.innerHTML = `Autor: ${manga.autor}`;
            labelUltimoCapLido.innerHTML = `Ultimo capitulo lido: ${manga.ultimoCapituloLido}`;
            labelGeneroECategoria.innerHTML = `${manga.genero} · ${manga.categoria}`;
            labelStatus.innerHTML = `${manga.status}`;
            (manga.linkImagem === '') ? imagem.src = 'images/erro.png' : imagem.src = manga.linkImagem;

            cardTexto.appendChild(labelTitulo);
            cardTexto.appendChild(labelAutor);
            cardTexto.appendChild(labelGeneroECategoria);
            cardTexto.appendChild(labelStatus);
            cardTexto.appendChild(labelUltimoCapLido);
            
            cardImagem.appendChild(imagem);
            card.appendChild(cardImagem);
            card.appendChild(cardTexto);
            listaMangas.appendChild(card);
            
            card.className = 'card';
            imagem.className = 'imagem';
            cardImagem.className = 'card-imagem'
            cardTexto.className = 'card-texto';
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

        vetorMangas.push(novoManga);
        exibirListaMangas();
        formManga.reset();
        formManga.style.display = 'none';
        abrirFormularioAux =! abrirFormularioAux;
        
    });

    const botaoAbrirFormulario = document.getElementById('btn-abrir-form');
    let abrirFormularioAux = true;
    botaoAbrirFormulario.addEventListener('click', () => {
        (abrirFormularioAux) ? formManga.style.display = 'flex' : formManga.style.display = 'none';
        abrirFormularioAux =! abrirFormularioAux;
    });
    
});
