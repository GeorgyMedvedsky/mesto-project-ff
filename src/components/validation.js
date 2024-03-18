const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, {...other}) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity('')
    }

    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, {...other})
    } else {
        hideInputError(formElement, inputElement, {...other});
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

const setButtonState = (buttonElement, state, {inactiveButtonClass}) => {
    if(state) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const toggleButtonState = (inputList, buttonElement, {...other}) => {
    if(hasInvalidInput(inputList)) setButtonState(buttonElement, true, {...other})
    else setButtonState(buttonElement, false, {...other})
};

const clearValidation = (formElement, inputElement, buttonElement, {...other}) => {
    setButtonState(buttonElement, true, {...other});
    hideInputError(formElement, inputElement, {...other});
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...other}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, {...other});
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, {...other});
            checkInputValidity(formElement, inputElement, {...other});
        });
        formElement.addEventListener('reset', () => clearValidation(formElement, inputElement, buttonElement, {...other}));
    });
};

export const enableValidation = ({formSelector, ...other}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => evt.preventDefault());
        setEventListeners(formElement, {...other});
    });
};