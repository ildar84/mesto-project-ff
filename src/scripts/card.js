const cardTemplate = document.querySelector('#card-template').content;

function createCard (card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true),
          buttonDelete = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').alt = card.alt;
    buttonDelete.addEventListener('click', evt => {
      deleteCard(evt);
    });
    return cardElement;
  }
  
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.parentElement.remove();
}
  
export { createCard, deleteCard };

