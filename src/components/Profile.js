import { getElement } from "../utils/utils"

// Элементы с информациоей о профиле
const profileName = getElement('.profile__title');
const profileDescription = getElement('.profile__description');
// Форма редактирования профиля
export const profileForm = getElement('#profile-form');
const nameInput = getElement('.popup__input_type_name', profileForm);
const descriptionInput = getElement('.popup__input_type_description', profileForm);

/** Обновляет значение полей формы */
export function updateProfileForm() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

/** Обрабатывет сабмит формы
 * @param {Event} evt - объект события
 */
export function handleProfileFormSubmit(evt) {
    // Отменить стандартную отправку формы
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
}