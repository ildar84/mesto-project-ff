import { createLike, deleteLike } from "./api";
import { openModal } from "./modal";
import { deleteCardPopup } from ".";

let currentCard;
let currentCardId;
const cardTemplate = document.querySelector('#card-template').content;
 

function createCard (cardData, handleDeleteCard, likeCard, clickImage, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
          
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__likes-number').textContent = cardData.likes.length;
        
    if(cardData.owner['_id'] != userId){
      cardElement.querySelector('.card__delete-button').style.display = 'none';
    }
    cardData.likes.forEach(user => {
      if(user['_id'] === userId) {
        cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
      }
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) =>  
      likeCard(evt, cardData['_id']));

    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => handleDeleteCard(cardElement, cardData['_id']));
    cardImage.addEventListener('click', clickImage);
     return cardElement;
  }
  
// @todo: Функция удаления карточки
function handleDeleteCard(cardElement, cardId) {
  openModal(deleteCardPopup);
  currentCardId = cardId;
  currentCard = cardElement;
}



function likeCard(evt, cardId) {
  const likeButton = evt.target;
  const likesNumberElement = likeButton.closest('.card__like-button-container').querySelector('.card__likes-number');
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLike : createLike;
  const toggleState = (count) => {
    likesNumberElement.textContent = count;
    likeButton.classList.toggle('card__like-button_is-active');
  };
  likeMethod(cardId)
    .then(result => toggleState(result.likes.length))
    .catch(err => console.log(err));
} 

export { createCard, handleDeleteCard, likeCard, currentCard, currentCardId };