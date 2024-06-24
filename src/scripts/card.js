import { deleteCard, createLike, deleteLike } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardData, handleDeleteCard, likeCard, clickImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true),
          buttonDelete = cardElement.querySelector('.card__delete-button'),
          cardLikeButton = cardElement.querySelector('.card__like-button');
          
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').alt = cardData.alt;
    cardLikeButton.addEventListener('click', (evt) =>  
      likeCard(evt, cardData['_id']));
    
    buttonDelete.addEventListener('click', (evt) => handleDeleteCard(evt, cardData['_id']));
    
    cardElement.querySelector('.card__image').addEventListener('click', clickImage);
    cardElement.querySelector('.card__likes-number').textContent = cardData.likes.length;

    return cardElement;
  }
  
// @todo: Функция удаления карточки
function handleDeleteCard(evt, cardId) {
  // evt.target.parentElement.remove();
  deleteCard(cardId)
    .then(evt.target.closest('.card').remove())
    .catch(err => console.log(err));
}

function likeCard(evt, cardId) {
  // evt.target.classList.toggle('card__like-button_is-active');
  const likeButton = evt.target;
  const likesNumberElement = likeButton.closest('.card__like-button-container').querySelector('.card__likes-number');
  const toggleState = (count) => {
    likesNumberElement.textContent = count;
    likeButton.classList.toggle('card__like-button_is-active');
  };
  if(!likeButton.classList.contains('card__like-button_is-active')) {
    createLike(cardId)
      .then(result => toggleState(result.likes.length))
      .catch(err => console.log(err));
  }
  else {
    deleteLike(cardId)
      .then(result => toggleState(result.likes.length))
      .catch(err => console.log(err));
  }
} 

export { createCard, handleDeleteCard, likeCard };