import { cardTemplate, modalContent, modalTypes } from "../utils/elements";
import { getElement } from "../utils/utils";
import { removeCard, removeLike, setLike } from "./api";
import { showModal } from "./modal";

/** Создает новую карточку
 * @param {CardData} cardData - данные карточки
 * @param {string} profileId - идентификатор профиля
 * @returns {HTMLElement} - готовая карточка
 */
export function createCard(cardData, profileId) {

    // Cоздать копию по шаблону
    const newCard = getElement('.card', cardTemplate).cloneNode(true);
    
    // Найти элементы карточки
    const cardImage = getElement('.card__image', newCard);
    const cardName = getElement('.card__title', newCard);
    const deleteBtn = getElement('.card__delete-button', newCard);
    const likeBtn = getElement('.card__like-button', newCard);
    const likes = getElement('.card__likes', newCard);

    // Наполнить карточку содержимым
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardName.textContent = cardData.name;
    likes.textContent = cardData.likes.length;
    deleteBtn.classList.add('card__delete-button_hidden');
    
    cardData.likes.forEach(user => {
        if(user._id === profileId) {
            likeBtn.classList.add('card__like-button_is-active');
        }
    });
    // Добавить обработчики
    // Установить возможность удаления карточки только тем, которые добавил пользователь
    if(profileId === cardData.owner._id) {
        deleteBtn.classList.remove('card__delete-button_hidden');
        deleteBtn.addEventListener('click', (evt) => deleteCard(evt, cardData._id));
    }
    likeBtn.addEventListener('click', () => handleLike(likeBtn, cardData, likes));
    cardImage.addEventListener('click', () => showImage(cardImage.src, cardName.textContent));
    
    // Вернуть готовую карточку
    return newCard;
}

/** Удаляет карточку
 * @param {Event} evt - объект события
 * @param {string} id - идентификатор карточки
 */
function deleteCard(evt, id) {
    removeCard(id)
        .then(() => {
            evt.target.closest('.card').remove();
        })
        .catch(err => console.error(err))
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
function handleLike(button, cardData, likes) {
    if(button.classList.contains('card__like-button_is-active')) {
        removeLike(cardData._id)
            .then((card) => {
                button.classList.remove('card__like-button_is-active');
                likes.textContent = card.likes.length;
            })
    } else {
        setLike(cardData._id)
            .then((card) => {
                button.classList.add('card__like-button_is-active');
                likes.textContent = card.likes.length;
            })
    }
}