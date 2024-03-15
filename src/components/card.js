import { cardTemplate, modalContent, modalTypes } from "../utils/elements";
import { getElement } from "../utils/utils";
import { showModal } from "./modal";

/** Объект данных карточки
 * @typedef {Object} CardData
 * @property {string} name - название карточки
 * @property {string} link - ссылка на изображение
 */
/** Создает новую карточку
 * @param {CardData} cardData - данные карточки
 * @returns {HTMLElement} - готовая карточка
 */
export function createCard({link, name}, likeHandler) {
    // Cоздать копию по шаблону
    const newCard = getElement('.card', cardTemplate).cloneNode(true);
    
    // Найти все элементы новой карточки
    const cardImage = getElement('.card__image', newCard);
    const cardName = getElement('.card__title', newCard);
    const deleteBtn = getElement('.card__delete-button', newCard);
    const likeBtn = getElement('.card__like-button', newCard);

    // Наполнить карточку содержимым
    cardImage.src = link;
    cardName.textContent = name;

    // Добавить обработчики
    deleteBtn.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', () => showImage(cardImage.src, cardName.textContent));
    likeBtn.addEventListener('click', likeHandler);
    
    // Вернуть готовую карточку
    return newCard;
}

/** Удаляет карточку
 * @param {Event} evt - объект события
 */
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

/** Открывает полноразмерное изображение
 * @param {string} image - ссылка на изображение
 * @param {string} title - описание изображения
 */
function showImage(image, title) {
    modalContent.image.src = image;
    modalContent.title.textContent = title;
    showModal(modalTypes.showImage);
}

/** Переключает кнопку лайка у карточки
 * @param {Event} evt - объект события
 */
export function handleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}