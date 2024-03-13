import './styles/index.css';
import { createCard } from './components/Card';
import { initialCards } from './utils/cards';
import { showModal, modalTypeEdit, modalTypeNewCard } from './components/Modal';

// DOM узлы / кнопки
const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Отобразить карточки при загрузке страницы
initialCards.forEach(card => {
    const newCard = createCard(card);
    cardsContainer.append(newCard);
});

// Установить обработчики на кнопки
editButton.addEventListener('click', () => showModal(modalTypeEdit));
addButton.addEventListener('click', () => showModal(modalTypeNewCard));