// Dom
const popUpAviso = document.getElementById('pop-up-aviso');
const textoAviso = document.getElementById('texto-aviso-label');

function chamarPopUpAviso(texto, cor){
    textoAviso.textContent = texto;
    popUpAviso.style.display = 'flex';
    popUpAviso.style.backgroundColor = cor
    setTimeout(() => {
        popUpAviso.style.display = 'none';
    }, 4000);
};

export default chamarPopUpAviso;