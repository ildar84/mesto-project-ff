// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
const cardPlace = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard (card) {
    
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardPlace.append(cardElement);

};




// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach (item => {
    console.log(item);
    createCard(item);
    
});