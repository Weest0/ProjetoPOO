document.addEventListener('DOMContentLoaded', () => {
    const mangaForm = document.getElementById('mangaForm');
    const mangaList = document.getElementById('mangaList');
    const submitButton = document.querySelector('#mangaForm button[type="submit"]');

    class Manga {
        constructor(title, author, genre, status) {
            this.id = Date.now();
            this.title = title;
            this.author = author;
            this.genre = genre;
            this.status = status;
        }

        static getMangas() {
            const mangas = localStorage.getItem('mangas');
            return mangas ? JSON.parse(mangas) : [];
        }

        static saveMangas(mangas) {
            localStorage.setItem('mangas', JSON.stringify(mangas));
        }

        static addManga(manga) {
            const mangas = Manga.getMangas();
            mangas.push(manga);
            Manga.saveMangas(mangas);
            Manga.displayMangas();
        }

        static deleteManga(id) {
            let mangas = Manga.getMangas();
            mangas = mangas.filter(manga => manga.id !== id);
            Manga.saveMangas(mangas);
            Manga.displayMangas();
        }

        static editManga(id, updatedManga) {
            const mangas = Manga.getMangas();
            const index = mangas.findIndex(manga => manga.id === id);
            mangas[index] = { id, ...updatedManga };
            Manga.saveMangas(mangas);
            Manga.displayMangas();
        }

        static displayMangas() {
            const mangas = Manga.getMangas();
            mangaList.innerHTML = '';
            mangas.forEach(manga => {
                const li = document.createElement('li');
                li.className = 'manga-item';
                li.innerHTML = `
                    <span>${manga.title} - ${manga.author} - ${manga.genre} - ${manga.status}</span>
                    <button class="edit" onclick="editManga(${manga.id})">Editar</button>
                    <button class="delete" onclick="deleteManga(${manga.id})">Deletar</button>
                `;
                mangaList.appendChild(li);
            });
        }
    }

    mangaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const status = document.getElementById('status').value;

        const manga = new Manga(title, author, genre, status);
        Manga.addManga(manga);

        mangaForm.reset();
    });

    window.deleteManga = (id) => {
        Manga.deleteManga(id);
    };

    window.editManga = (id) => {
        const mangas = Manga.getMangas();
        const manga = mangas.find(m => m.id === id);
        document.getElementById('title').value = manga.title;
        document.getElementById('author').value = manga.author;
        document.getElementById('genre').value = manga.genre;
        document.getElementById('status').value = manga.status;

        // Handle the edit process
        submitButton.textContent = 'Atualizar';
        submitButton.onclick = (event) => {
            event.preventDefault();
            const updatedManga = {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                genre: document.getElementById('genre').value,
                status: document.getElementById('status').value
            };
            Manga.editManga(id, updatedManga);
            mangaForm.reset();
            submitButton.textContent = 'Adicionar Manga';
            submitButton.onclick = null;  // Reset to default behavior
        };
    };

    // Initial display of mangas
    Manga.displayMangas();
});
