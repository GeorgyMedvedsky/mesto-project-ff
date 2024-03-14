import { getElement } from "../utils/utils";
import { showModal, modalTypeImage, modalContentImage, modalContentTitle } from "./Modal";

const cardTemplate = getElement('#card-template').content;

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
    const newCard = getElement('.card', cardTemplate).cloneNode(true);
    
    // найти все элементы
    const cardImage = getElement('.card__image', newCard);
    const cardName = getElement('.card__title', newCard);
    const deleteBtn = getElement('.card__delete-button', newCard);
    const likeBtn = getElement('.card__like-button', newCard);

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