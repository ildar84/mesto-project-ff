// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeCard } from './card';
import { openModal, closeModal, setEventListenersToClosePopups } from './modal';

const cardPlace = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');     
const popupTypeEdit = document.querySelector('.popup_type_edit'); 
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card'); 
const popups = document.querySelectorAll('.popup');
const formEditProfile = document.querySelector('form[name=edit-profile]');
const inputName = formEditProfile.querySelector('input[name=name]');
const inputDescr = formEditProfile.querySelector('input[name=description]');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const formAddCard = document.querySelector('form[name=new-place]');
const newName = formAddCard.querySelector('input[name=place-name]');
const newLink = formAddCard.querySelector('input[name=link]');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу
function addCard(cardElement) {
  cardPlace.append(cardElement);
}

function openEditProfileForm() {
  openModal(popupTypeEdit);
  inputName.value = nameInput.textContent;
  inputDescr.value = jobInput.textContent;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameInput.textContent = inputName.value;
  jobInput.textContent = inputDescr.value;
  closeModal(popupTypeEdit);
}

function handleNewCard(evt) {
  evt.preventDefault(); 
  const card = {};
  card.name = newName.value;
  card.link = newLink.value;
  card.alt = newName.value;
  cardPlace.prepend(createCard(card, deleteCard, likeCard, clickImage));
  formAddCard.reset();
  closeModal(popupTypeNewCard);
}

function clickImage(evt) {
  const openImage = evt.target;
  popupImage.src = openImage.src;
  popupCaption.textContent = openImage.closest('.card').querySelector('.card__title').textContent;
  openModal(popupTypeImage);
}

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

profileEditButton.addEventListener('click', openEditProfileForm);

formAddCard.addEventListener('submit', handleNewCard);

formEditProfile.addEventListener('submit', submitEditProfileForm);

popups.forEach(item => setEventListenersToClosePopups(item));

initialCards.forEach (item => addCard(createCard(item, deleteCard, likeCard, clickImage)));