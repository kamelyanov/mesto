import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.edit-form__input');
    this._popupBtnSave = this._form.querySelector('.popup__btn-save');
    this._popupBtnSaveText = this._popupBtnSave.textContent
  }

  _getInputValues() {
    this._valuesForms = {};
    this._inputList.forEach(input => {
      this._valuesForms[input.name] = input.value
    })
    return this._valuesForms
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close()
    this._form.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupBtnSave.textContent = 'Сохранение...'
    } else {
      this._popupBtnSave.textContent = this._popupBtnSaveText
    }
  }
}
