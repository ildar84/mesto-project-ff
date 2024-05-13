const cardTemplate = document.querySelector('#card-template').content;

function createCard (card, deleteCard, likeCard, clickImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true),
          buttonDelete = cardElement.querySelector('.card__delete-button'),
          cardLikeButton = cardElement.querySelector('.card__like-button');
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').alt = card.alt;
    cardLikeButton.addEventListener('click', evt => { 
      likeCard(evt);
    });
    buttonDelete.addEventListener('click', evt => {
      deleteCard(evt);
    });
    cardElement.querySelector('.card__image').addEventListener('click', clickImage);
    

    return cardElement;
  }
  
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
} 

export { createCard, deleteCard, likeCard };

