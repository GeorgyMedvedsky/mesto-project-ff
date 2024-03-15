import { getElement } from "./utils";

// Формы и их элементы
export const forms = {
    editProfileForm: document.forms.editProfile,
    newPlaceForm: document.forms.newPlace
};

// Элементы с информацией о профиле
export const profileName = getElement('.profile__title');
export const profileDescription = getElement('.profile__description');

// Шаблон карточки
export const cardTemplate = getElement('#card-template').content;

// Модальные окна и их элементы
export const modals = Array.from(document.querySelectorAll('.popup'));
export const modalTypes = {
    editProfile: getElement('.popup_type_edit'),
    addCard: getElement('.popup_type_new-card'),
    showImage: getElement('.popup_type_image')
};
export const modalContent = {
    image: getElement('.popup__image', modalTypes.showImage),
    title: getElement('.popup__caption', modalTypes.showImage)
};