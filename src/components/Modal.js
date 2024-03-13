// Модальные окна и их компоненты
const modals = Array.from(document.querySelectorAll('.popup'));
export const modalTypeEdit = document.querySelector('.popup_type_edit');
export const modalTypeNewCard = document.querySelector('.popup_type_new-card');
export const modalTypeImage = document.querySelector('.popup_type_image');
export const modalContentImage = modalTypeImage.querySelector('.popup__image');
export const modalContentTitle = modalTypeImage.querySelector('.popup__caption');

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
function hideModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', hideModalByEsc);
}

/** Скрывает модальное окно при нажатии на esc
 * @param {Event} evt - объект события
 */
function hideModalByEsc(evt) {
    const activeModal = document.querySelector('.popup_is-opened');
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