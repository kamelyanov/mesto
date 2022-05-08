import Popup from './Popup.js'

export default class PopupConfirm extends Popup {
   constructor (popup) {
    super(popup)
    this._form = this._popup.querySelector('.form');
    
    this._popupBtnConfirm = this._form.querySelector('.popup__btn-confirm');
    this._popupBtnConfirmText = this._popupBtnConfirm.textContent
  }
  
  setEventListeners() {
    super.setEventListeners() 

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback()
    })
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupBtnConfirm.textContent = 'Удаление...'
    } else {
      this._popupBtnConfirm.textContent = this._popupBtnConfirmText
    }
  }
}
