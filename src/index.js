import './styles/index.css';
import { createCard } from './components/Card';
import { initialCards } from './utils/cards';
import { showModal, hideModal, modalTypeEdit, modalTypeNewCard } from './components/Modal';
import { getElement } from './utils/utils';
import { profileForm, updateProfileForm, handleProfileFormSubmit } from './components/Profile';

// DOM узлы / кнопки
const cardsContainer = getElement('.places__list');
const editButton = getElement('.profile__edit-button');
const addButton = getElement('.profile__add-button');

// Отобразить карточки при загрузке страницы
initialCards.forEach(card => {
    const newCard = createCard(card);
    cardsContainer.append(newCard);
});

// Установить обработчики событий на странице
editButton.addEventListener('click', () => {
    updateProfileForm();
    showModal(modalTypeEdit);
});
addButton.addEventListener('click', () => showModal(modalTypeNewCard));
profileForm.addEventListener('submit', (evt) => {
    handleProfileFormSubmit(evt);
    hideModal(modalTypeEdit);
});