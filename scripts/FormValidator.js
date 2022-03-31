export class FormValidator {
  constructor(object, form) {
    this._object = object;
    this._form = form;
    
    this._inputList = Array.from(this._form.querySelectorAll(this._object.inputSelector));
    this._submitButtonElement = this._form.querySelector(this._object.submitButtonSelector);
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._object.errorClass);
    inputElement.classList.add(this._object.inputErrorClass);
  };

  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._object.errorClass);
    inputElement.classList.remove(this._object.inputErrorClass);
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, submitButtonElement) {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._object.inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', true)
    } else {
      this._submitButtonElement.classList.remove(this._object.inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled')
    };
  };

  checkFormValidity = () => {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideError(inputElement)
    });
  };

  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage);
    } else {
      this._hideError(inputElement);
    };
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // console.log('this =>', this) //если не работает сделать внешнюю функцию стрелочной
        this._checkValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  };
};


