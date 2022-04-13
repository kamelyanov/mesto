import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor (popup, submit) {
    super(popup);
    this._submit = submit;

    this._form = document.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.edit-form__input');
  }

    _getInputValues() {
    this._valuesForms = {};
    this._valuesForms.forEach(input => {
      this._newValues[input.name] = input.value
    })
    return this._valuesForms
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submit(this.__getInputValues());
    })
  }
  
  close() {
    super.close() 
    this._form.reset();
  }
}
