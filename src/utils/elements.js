import { getElement } from "./utils";

// Формы и их элементы
export const forms = {
    editProfileForm: document.forms.editProfile,
    newPlaceForm: document.forms.newPlace,
    avatarForm: document.forms.avatar
};

// Элементы с информацией о профиле
export const profile = {
    name: getElement('.profile__title'),
    about: getElement('.profile__description'),
    avatar: getElement('.profile__image'),
    id: undefined
};

// Кнопки
export const editButton = getElement('.profile__edit-button');
export const addButton = getElement('.profile__add-button');

// Шаблон карточки
export const cardTemplate = getElement('#card-template').content;

// Модальные окна и их элементы
export const modals = Array.from(document.querySelectorAll('.popup'));
export const modalTypes = {
    editProfile: getElement('.popup_type_edit'),
    addCard: getElement('.popup_type_new-card'),
    showImage: getElement('.popup_type_image'),
    editAvatar: getElement('.popup_type_avatar')
};
export const modalContent = {
    image: getElement('.popup__image', modalTypes.showImage),
    title: getElement('.popup__caption', modalTypes.showImage)
};

// Настройки валидации
export const validationSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};