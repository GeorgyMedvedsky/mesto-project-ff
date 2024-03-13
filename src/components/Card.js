import { showModal, modalTypeImage, modalContentImage, modalContentTitle } from "./Modal";

const cardTemplate = document.querySelector('#card-template').content;

/** Объект данных карточки
 * @typedef {Object} CardData
 * @property {string} name - название карточки
 * @property {string} link - ссылка на изображение
 */
/** Создает новую карточку
 * @param {CardData} cardData - данные карточки
 * @returns {HTMLElement} - готовая карточка
 */
export function createCard({link, name}) {

    // создать копию
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    
    // найти все элементы
    const cardImage = newCard.querySelector('.card__image');
    const cardName = newCard.querySelector('.card__title');
    const deleteBtn = newCard.querySelector('.card__delete-button');
    const likeBtn = newCard.querySelector('.card__like-button');

    // наполнить карточку содержимым
    cardImage.src = link;
    cardName.textContent = name;

    // добавить обработчики
    // удалить карточку
    deleteBtn.addEventListener('click', deleteCard);
    // открыть полноразмерное изображение
    cardImage.addEventListener('click', () => {
        modalContentImage.src = cardImage.src;
        modalContentTitle.textContent = cardName.textContent;
        showModal(modalTypeImage);
    });
    
    // вернуть готовую карточку
    return newCard;
}

/** Удаляет карточку
 * @param {Event} evt - объект события
 */
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}