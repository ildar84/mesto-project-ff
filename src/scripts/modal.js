function openModal(popup) {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', closeModalEsc);
}

function closeModal(popup) {
	popup.classList.remove('popup_is-opened');
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

function setEventListenersToClosePopups(popup) {
	popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup));
	popup.addEventListener('click', closeModalOverlay);
}

export { openModal, closeModal, setEventListenersToClosePopups };