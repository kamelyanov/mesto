import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor (popup, submit) {
    super(popup);
    this._submit = submit;

    this._form = document.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.edit-form__input');
  }

  //собрать данные всех полей формы 
  _getInputValues() {
    
  }

  

}
