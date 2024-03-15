import './styles/index.css';
import { createCard, handleLike } from './components/card';
import { initialCards } from './utils/cards';
import { showModal } from './components/modal';
import { getElement, renderCard } from './utils/utils';
import { updateForm, handleFormSubmit } from './components/form';
import { forms, modalTypes } from './utils/elements';

// Кнопки
const editButton = getElement('.profile__edit-button');
const addButton = getElement('.profile__add-button');

// Отобразить карточки при загрузке страницы
initialCards.forEach(card => renderCard(createCard(card, handleLike)));

// Установить обработчики событий на кнопки
editButton.addEventListener('click', () => {
    updateForm(forms.editProfileForm)
    showModal(modalTypes.editProfile);
});
addButton.addEventListener('click', () => {
    updateForm(forms.newPlaceForm)
    showModal(modalTypes.addCard);
});

// Установить обработчики событий на все формы
forms.editProfileForm.addEventListener('submit', (evt) => handleFormSubmit(evt, forms.editProfileForm));
forms.newPlaceForm.addEventListener('submit', (evt) => handleFormSubmit(evt, forms.newPlaceForm, renderCard, createCard));