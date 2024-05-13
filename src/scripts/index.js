// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeCard } from './card';
import { openModal, closeModal, allCloseModal } from './modal';

const cardPlace = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');     
const popupTypeEdit = document.querySelector('.popup_type_edit'); 
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card'); 
const popup = document.querySelectorAll('.popup');
// const popupClose = popupTypeNewCard.querySelector('.popup__close');
// const popupTypeImage = document.querySelector('.popup_type_image');
// const cardImage = document.querySelectorAll('.card__image');        
const editForm = document.querySelector('form[name=edit-profile]');
const inputName = editForm.querySelector('input[name=name]');
const inputDescr = editForm.querySelector('input[name=description]');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const newCard = document.querySelector('form[name=new-place]');
const newName = newCard.querySelector('input[name=place-name]');
const newLink = newCard.querySelector('input[name=link]');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу
function addCard(cardElement) {
  cardPlace.append(cardElement);
}

function profileEdit() {
  openModal(popupTypeEdit);
  inputName.value = nameInput.textContent;
  inputDescr.value = jobInput.textContent;
}

function handleFormSubmit(evt) {
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
  cardPlace.prepend(createCard(card, deleteCard));
  newCard.reset();
  closeModal(popupTypeNewCard);
}

function clickImage(evt) {
  const openImage = evt.target;
  popupImage.src = openImage.src;
  popupCaption.textContent = openImage.closest('.card').querySelector('.card__title').textContent;
  openModal(popupTypeImage);
}






profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

profileEditButton.addEventListener('click', profileEdit);

newCard.addEventListener('submit', handleNewCard);

editForm.addEventListener('submit', handleFormSubmit);

popup.forEach(item => allCloseModal(item));

initialCards.forEach (item => addCard(createCard(item, deleteCard, likeCard, clickImage)));