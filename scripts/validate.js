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
    submitButtonElement.classList.add('popup__btn-save_inactive');
    submitButtonElement.setAttribute('disabled', true)
  } else {
    submitButtonElement.classList.remove('popup__btn-save_inactive');
    submitButtonElement.removeAttribute('disabled')
  };
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__input'));
  const submitButtonElement = formElement.querySelector('.popup__btn-save');
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
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__input'));
  const submitButtonElement = formElement.querySelector('.popup__btn-save');
  toggleButtonState(inputList, submitButtonElement);
};

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('edit-form__input-error_active')
}

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('edit-form__input-error_active')
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__input-error_active'
}); 