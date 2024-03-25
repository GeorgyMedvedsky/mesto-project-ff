import { forms, modalTypes, profile } from "../utils/elements";
import { getElement, renderCard } from "../utils/utils";
import { addCard, updateProfile } from "./api";
import { createCard } from "./card";
import { hideModal } from "./modal";

/** Обрабатывет сабмит формы
 * @param {Event} evt - объект события
 * @param {HTMLElement} form - обрабатываемая форма
 */
export function handleFormSubmit(evt, form) {
    // Отменить стандартную отправку формы
    evt.preventDefault();

    // Проверить полученную форму
    switch(form) {

        // Обновить информацию о пользователе
        case forms.editProfileForm: {

            // Найти кнопку сабмита формы и изменить текст для улучшения UI
            const submitBtn = getElement('.popup__button', modalTypes.editProfile);
            submitBtn.textContent = 'Сохранение...';

            // Выполнить запрос к API
            updateProfile(form.name.value, form.description.value)
                .then(() => {
                    
                    // Изменить содержимое на странице в ответ на ввод ползователя
                    profile.name.textContent = form.name.value;
                    profile.about.textContent = form.description.value;
                    form.reset();
                })
                .catch(err => console.error(err))
                .finally(() => {
                    submitBtn.textContent = 'Сохранить';
                })
            break;
        }

        // Добавить карточку
        case forms.newPlaceForm: {

            const submitBtn = getElement('.popup__button', modalTypes.addCard);
            submitBtn.textContent = 'Сохранение...';

            // Запрос к API
            addCard(form.placeName.value, form.link.value)
                .then(cardData => {

                    // Создать и вывести на страницу новую карточку по введенным данным
                    const newCard = createCard(cardData, profile.id);
                    renderCard(newCard);
                    form.reset();
                })
                .catch(err => console.error(err))
                .finally(() => {
                    submitBtn.textContent = 'Сохранить';
                })
            break;
        }

        // Сменить аватар пользователя
        case forms.avatarForm: {
            const submitBtn = getElement('.popup__button', modalTypes.editAvatar);
            submitBtn.textContent = 'Сохранение...';
            updateAvatar(form.link.value)
                .then(user => {
                    profile.avatar.src = user.avatar;
                    form.reset();
                })
                .catch(err => console.error(err))
                .finally(() => {
                    submitBtn.textContent = 'Сохранить';
                })
            break;
        }

        default: break;
    }

    // Закрыть модалку после всех действий
    hideModal(form.closest('.popup'));
}