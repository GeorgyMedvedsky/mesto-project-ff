import './styles/index.css';
import { createCard } from './components/card';
import { showModal, hideModal } from './components/modal';
import { enableValidation } from './components/validation';
import { getElement, renderCard } from './utils/utils';
import {
    forms,
    modalTypes,
    profileDescription,
    profileImage,
    profileName
} from './utils/elements';
import {
    getInitialCards,
    getProfileData,
    updateProfile,
    addCard,
    updateAvatar
} from './components/api';

let userID = undefined;

// Кнопки
const editButton = getElement('.profile__edit-button');
const addButton = getElement('.profile__add-button');

// Установить обработчики событий на кнопки и сбросить состояние форм
editButton.addEventListener('click', () => {
    forms.editProfileForm.reset();
    forms.editProfileForm.name.value = profileName.textContent;
    forms.editProfileForm.description.value = profileDescription.textContent;
    showModal(modalTypes.editProfile);
    forms.editProfileForm.name.focus();
});
addButton.addEventListener('click', () => {
    forms.newPlaceForm.reset();
    showModal(modalTypes.addCard);
    forms.newPlaceForm.placeName.focus();
});
profileImage.addEventListener('click', () => {
    forms.editProfileForm.reset();
    showModal(modalTypes.editAvatar);
    forms.avatarForm.link.focus();
});

// Установить обработчики событий на все формы
forms.editProfileForm.addEventListener('submit', (evt) => handleFormSubmit(evt, forms.editProfileForm));
forms.newPlaceForm.addEventListener('submit', (evt) => handleFormSubmit(evt, forms.newPlaceForm));
forms.avatarForm.addEventListener('submit', (evt) => handleFormSubmit(evt, forms.avatarForm))

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

/** Обрабатывет сабмит формы
 * @param {Event} evt - объект события
 * @param {HTMLElement} form - обрабатываемая форма
 */
function handleFormSubmit(evt, form) {
    // Отменить стандартную отправку формы
    evt.preventDefault();

    // Проверить полученную форму
    switch(form) {

        // Если получена форма редактирования профиля - обновить информацию о пользователе
        case forms.editProfileForm: {
            const submitBtn = getElement('.popup__button', modalTypes.editProfile);
            submitBtn.textContent = 'Сохранение...';
            updateProfile(form.name.value, form.description.value)
                .then(() => {
                    profileName.textContent = form.name.value;
                    profileDescription.textContent = form.description.value;
                    form.reset();
                })
                .catch(err => console.error(err))
                .finally(() => {
                    submitBtn.textContent = 'Сохранить';
                })
            break;
        }

        // Если получена форма добавления карточки - добавить карточку
        case forms.newPlaceForm: {
            const submitBtn = getElement('.popup__button', modalTypes.addCard);
            submitBtn.textContent = 'Сохранение...';
            addCard(form.placeName.value, form.link.value)
                .then(cardData => {
                    const newCard = createCard(cardData, userID);
                    renderCard(newCard);
                    form.reset();
                })
                .catch(err => console.error(err))
                .finally(() => {
                    submitBtn.textContent = 'Сохранить';
                })
            break;
        }

        case forms.avatarForm: {
            const submitBtn = getElement('.popup__button', modalTypes.editAvatar);
            submitBtn.textContent = 'Сохранение...';
            updateAvatar(form.link.value)
                .then((user) => {
                    profileImage.src = user.avatar;
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

// Обработать промисы, когда те будут выполнены
Promise.all([getProfileData(), getInitialCards()])
    .then(([profileResponse, cardsResponse]) => {
        userID = profileResponse._id;
        profileName.textContent = profileResponse.name;
        profileDescription.textContent = profileResponse.about;
        profileImage.src = profileResponse.avatar;

        cardsResponse.reverse().forEach(card => {
            const newCard = createCard(card, profileResponse._id);
            renderCard(newCard);
        });
    })
    .catch(err => console.error(err))