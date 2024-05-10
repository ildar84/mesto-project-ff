// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
import '../pages/index.css';
import { initialCards } from './cards';



const cardPlace = document.querySelector('.places__list'),
      cardTemplate = document.querySelector('#card-template').content;

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

// @todo: Вывести карточки на страницу
function addCard(cardElement) {
  cardPlace.append(cardElement);
}

initialCards.forEach (item => addCard(createCard(item, deleteCard)));




