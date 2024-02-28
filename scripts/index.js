// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// DOM узлы
const cardsContainer = document.querySelector('.places__list');
// функция создания карточки
function createCard(cardData, callback) {
    // создать клон карточки
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);

    // найти элементы созданной карточки
    const cardImage = newCard.querySelector('.card__image');
    const cardName = newCard.querySelector('.card__title');
    const deleteCardBtn = newCard.querySelector('.card__delete-button');

    // наполнить новую карточку содержимым
    cardImage.src = cardData.link;
    cardName.textContent = cardData.name;
    deleteCardBtn.addEventListener('click', callback);
    
    // вернуть готовую карточку
    return newCard;
}
// функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

// вывод карточек на страницу
initialCards.forEach(card => {
    const newCard = createCard(card, deleteCard);
    cardsContainer.append(newCard);
});