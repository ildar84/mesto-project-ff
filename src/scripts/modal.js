

function openModal(win) {
    win.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
}

function closeModal(win) {
    win.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function allCloseModal(win) {
    win.querySelector('.popup__close').addEventListener('click', () => closeModal(win));
    win.addEventListener('click', closeModalOverlay);
}

export { openModal, closeModal, allCloseModal };