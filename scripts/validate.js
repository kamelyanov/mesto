const validationSettings = {
  formSelector: '.form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__input-error_active'
}; 


const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, submitButtonElement) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(validationSettings.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true)
  } else {
    submitButtonElement.classList.remove(validationSettings.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled')
  };
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const submitButtonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      console.log(event.target.name, event.target.value);
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement); //чтобы проверять при измененеии полей 
    });
  });
};

const checkFormValidity = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const submitButtonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement);
};

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
}

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(validationSettings.errorClass)
}

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, validationSettings);
  });
};

enableValidation(validationSettings);

