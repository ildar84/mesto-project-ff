const showInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}__input_error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}__input_error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = ''; 
};

const isValid = (formElement, inputElement, inputErrorClass) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);    
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputErrorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);

    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

function enableValidation(validationConfig) {
    const {formSelector, inputSelector, submitButtonSelector, inputErrorClass, inactiveButtonClass} = validationConfig;
    const formList = Array.from(document.querySelectorAll(formSelector));
    const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      const buttonElement = formElement.querySelector(submitButtonSelector);
      inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, inputErrorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      }));
    };
    formList.forEach(formElement => setEventListeners(formElement));
  }

function clearValidation(formElement, validationConfig) {
    const {inputSelector, submitButtonSelector, inputErrorClass, inactiveButtonClass} = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach(inputElement => {
      if(inputElement.classList.contains(inputErrorClass)){
        hideInputError(formElement, inputElement, inputErrorClass);
      }
    });
    formElement.reset();
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  }

export{enableValidation, clearValidation};