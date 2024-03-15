import { forms, profileName, profileDescription } from "../utils/elements";
import { hideModal } from "./modal";


/** Обновляет полученную форму в зависимости от состояния приложения
 * @param {HTMLElement} form - обрабатываемая форма
 */
export function updateForm(form) {
    switch(form) {
        case forms.editProfileForm: {
            forms.editProfileForm.name.value = profileName.textContent;
            forms.editProfileForm.description.value = profileDescription.textContent;
            break;
        }
        case forms.newPlaceForm: {
            forms.newPlaceForm.placeName.value = '';
            forms.newPlaceForm.link.value = '';
            break;
        }
        default: break;
    }
}

/** Обрабатывет сабмит формы
 * @param {Event} evt - объект события
 * @param {HTMLElement} form - обрабатываемая форма
 * @param {Function} renderFunc - функция отрисовки карточки
 * @param {Function} createFunc - функция создания карточки
 */
export function handleFormSubmit(evt, form, renderFunc, createFunc) {
    // Отменить стандартную отправку формы
    evt.preventDefault();

    // Найти активное модальное окно
    const activeModal = form.closest('.popup');

    // Проверить полученную форму
    switch(form) {

        // Если пришла форма редактирования профиля - обновить информацию о пользователе на странице на данные из формы
        case forms.editProfileForm: {
            profileName.textContent = form.name.value;
            profileDescription.textContent = form.description.value;
            break;
        }

        // Если пришла форма добавления карточки - создать новый объект карточки с данными взятыми из формы и вывести ее на страницу
        case forms.newPlaceForm: {
            const cardData = {
                link: form.link.value,
                name: form.placeName.value
            };
            renderFunc(createFunc(cardData));
        }
        default: break;
    }

    // Закрыть модалку после всех действий
    hideModal(activeModal);
}