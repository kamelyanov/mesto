const validationSettings = {
  formSelector: '.form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__input-error_active'
}; 


const checkValidity = (formElement, inputElement, object) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, object);
  } else {
    hideError(formElement, inputElement, object);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, submitButtonElement, object) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(object.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true)
  } else {
    submitButtonElement.classList.remove(object.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled')
  };
}

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const submitButtonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement, object);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      console.log(event.target.name, event.target.value);
      checkValidity(formElement, inputElement, object);
      toggleButtonState(inputList, submitButtonElement, object); //чтобы проверять при измененеии полей 
    });
  });
};

const checkFormValidity = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const submitButtonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement, object);
};

const showError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
}

const hideError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(object.errorClass)
}

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, object);
  });
};

enableValidation(validationSettings);

