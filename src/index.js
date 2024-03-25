import './styles/index.css';
import { createCard } from './components/card';
import { showModal } from './components/modal';
import { enableValidation } from './components/validation';
import { renderCard, setEventListeners } from './utils/utils';
import { handleFormSubmit } from './components/form';
import {
    addButton,
    editButton,
    forms,
    modalTypes,
    profile,
    validationSelectors
} from './utils/elements';
import {
    getInitialCards,
    getProfileData,
} from './components/api';

// Обработка нажатий на основные элементы на странице
editButton.addEventListener('click', () => {
    forms.editProfileForm.reset();
    forms.editProfileForm.name.value = profile.name.textContent;
    forms.editProfileForm.description.value = profile.about.textContent;
    showModal(modalTypes.editProfile);
    forms.editProfileForm.name.focus();
});
addButton.addEventListener('click', () => {
    forms.newPlaceForm.reset();
    showModal(modalTypes.addCard);
    forms.newPlaceForm.placeName.focus();
});
profile.avatar.addEventListener('click', () => {
    forms.editProfileForm.reset();
    showModal(modalTypes.editAvatar);
    forms.avatarForm.link.focus();
});

// Установить на все формы обработчики событий
for(let form in forms) {
    setEventListeners(forms[form], 'submit', (evt) => handleFormSubmit(evt, forms[form]))
}

// Валидация
enableValidation(validationSelectors);

// Обработать промисы, когда те будут выполнены
Promise.all([getProfileData(), getInitialCards()])
    .then(([profileResponse, cardsResponse]) => {
        profile.id = profileResponse._id;
        profile.name.textContent = profileResponse.name;
        profile.about.textContent = profileResponse.about;
        profile.avatar.src = profileResponse.avatar;

        cardsResponse.reverse().forEach(card => {
            const newCard = createCard(card, profileResponse._id);
            renderCard(newCard);
        });
    })
    .catch(err => console.error(err))