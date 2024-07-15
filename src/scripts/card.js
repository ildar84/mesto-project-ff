import { createLike, deleteLike } from "./api";

const cardTemplate = document.querySelector('#card-template').content;


function createCard (cardData, handleDeleteCard, likeCard, clickImage, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
          
    const cardImage = cardElement.querySelector('.card__image');

    const likeButton = cardElement.querySelector('.card__like-button');
    const likesNumberElement = likeButton.closest('.card__like-button-container').querySelector('.card__likes-number');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    likesNumberElement.textContent = cardData.likes.length;
        
    if(cardData.owner['_id'] != userId){
      cardElement.querySelector('.card__delete-button').style.display = 'none';
    }
    cardData.likes.forEach(user => {
      if(user['_id'] === userId) {
        likeButton.classList.add('card__like-button_is-active');
      }
    });
    
    likeButton.addEventListener('click', (evt) =>  
      likeCard(cardData['_id'], likeButton, likesNumberElement));

    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => handleDeleteCard(cardElement, cardData['_id']));
    cardImage.addEventListener('click', clickImage);
     return cardElement;
  }

function toggleState (count, likeButton, likesNumberElement) {
  likesNumberElement.textContent = count;
  likeButton.classList.toggle('card__like-button_is-active');  
}

  
function likeCard(cardId, likeButton, likesNumberElement) {

  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLike : createLike;
  
  likeMethod(cardId)
    .then(result => toggleState(result.likes.length, likeButton, likesNumberElement))
    .catch(err => console.log(err));
} 


export { createCard, likeCard };