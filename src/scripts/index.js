import '../pages/index.css';
import { createCard, handleDeleteCard, likeCard, currentCard, currentCardId } from './card';
import { openModal, closeModal, setEventListenersToClosePopups } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserData, getInitialCards, updateUserData, createNewCard, updateAvatar, deleteCard} from './api';

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
const profileImage = document.querySelector('.profile__image');
const formAddCard = document.querySelector('form[name=new-place]');
const newName = formAddCard.querySelector('input[name=place-name]');
const newLink = formAddCard.querySelector('input[name=link]');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarFormElement = document.querySelector('form[name=edit-avatar]');
const avatarLinkInput = editAvatarFormElement.querySelector('.popup__input_type_url');
let userId = null;
export const deleteCardPopup = document.querySelector('.popup_type_delete');
const deleteCardFormElement = document.querySelector('form[name=delete-card]');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
};


function addCard(cardElement, container) {
  container.append(cardElement);
}

function dataLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

function openPopup(popup) {
  const formElement = popup.querySelector('.popup__form');
  clearValidation(formElement, validationConfig);
  
  openModal(popup);
  if(popup === popupTypeEdit) {
    inputName.value = nameInput.textContent;
    inputDescr.value = jobInput.textContent;
  }
  
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  const button = popupTypeEdit.querySelector('.popup__button');
  dataLoading(true, button);
  updateUserData(inputName.value, inputDescr.value)
    .then(result => {
      nameInput.textContent = result.name;
      jobInput.textContent = result.about;
      closeModal(popupTypeEdit);
    })
    .catch(err => console.log(err))
    .finally(() => dataLoading(false, button));
}

function editAvatar(evt) {
  evt.preventDefault();
  const button = editAvatarPopup.querySelector('.popup__button');
  dataLoading(true, button);
  updateAvatar(avatarLinkInput.value)
    .then(result => {
      profileImage.style.backgroundImage = `url(\'${result.avatar}\')`;
      closeModal(editAvatarPopup);
    })
    .catch(err => console.log(err))
    .finally(() => dataLoading(false, button));
}

function handleNewCard(evt) {
  evt.preventDefault();
  const button = popupTypeNewCard.querySelector('.popup__button');
  dataLoading(true, button);
  createNewCard(newName.value, newLink.value)
    .then(result => {
      cardPlace.prepend(createCard(result, handleDeleteCard, likeCard, clickImage, userId));
      closeModal(popupTypeNewCard);
    })
    .catch(err => console.log(err))
    .finally(() => dataLoading(false, button));
}

function handleDeleteCardFormSubmit(evt) {
  evt.preventDefault();
  deleteCard(currentCardId)
  .then(() => {
    currentCard.remove();
    closeModal(deleteCardPopup);
  })
  .catch(err => console.log(err));
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
});


function clickImage(evt) {
  const openImage = evt.target;
  popupImage.src = openImage.src;
  popupImage.alt = openImage.alt;
  popupCaption.textContent = openImage.alt;
  openModal(popupTypeImage);
}

profileImage.addEventListener('click', () => {
  openPopup(editAvatarPopup);
});

profileEditButton.addEventListener('click', () => openPopup(popupTypeEdit));

profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard));

formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', handleNewCard);

editAvatarFormElement.addEventListener('submit', editAvatar);

deleteCardFormElement.addEventListener('submit', handleDeleteCardFormSubmit);

popups.forEach(item => setEventListenersToClosePopups(item));

Promise.all([getUserData(), getInitialCards()])
  .then(results => {
    const [userData, cardList] = results;
    nameInput.textContent = userData.name;
    jobInput.textContent = userData.about;
    profileImage.style.backgroundImage = `url(\'${userData.avatar}\')`;
    
    userId = userData['_id'];
    cardList.forEach(cardData => addCard(createCard(cardData, handleDeleteCard, likeCard, clickImage, userId), cardPlace));
  })
  .catch(err => console.log(err));

