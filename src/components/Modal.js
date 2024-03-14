import { getElement } from "../utils/utils";

// Модальные окна и их компоненты
const modals = Array.from(document.querySelectorAll('.popup'));
export const modalTypeEdit = getElement('.popup_type_edit');
export const modalTypeNewCard = getElement('.popup_type_new-card');
export const modalTypeImage = getElement('.popup_type_image');
export const modalContentImage = getElement('.popup__image', modalTypeImage);
export const modalContentTitle = getElement('.popup__caption', modalTypeImage);

/** Открывает модальное окно
 * @param {HTMLElement} modal - тип модального окна
 */
export function showModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', hideModalByEsc);
}

/** Скрывает модальное окно
 * @param {HTMLElement} modal - тип модального окна
 */
export function hideModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', hideModalByEsc);
}

/** Скрывает модальное окно при нажатии на esc
 * @param {Event} evt - объект события
 */
function hideModalByEsc(evt) {
    const activeModal = getElement('.popup_is-opened');
    if(evt.key === `Escape`) {
        hideModal(activeModal);
    }
}

// Установить логику закрытия каждому модальному окну
modals.forEach(modal => {
    modal.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__close')) hideModal(modal);
        if(evt.target.classList.contains('popup_is-opened')) hideModal(modal);
    });
});