import Popup from './Popup' 

export default class PopupConfirm extends Popup {
  constructor (popup) {
    super(popup)

    this._form = this._popup.querySelector('.form');

    this._popupBtnSave = this._form.querySelector('.popup__btn-save');
    this._popupBtnSaveText = this._popupBtnSave.textContent
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
      this._popupBtnSave.textContent = 'Удаление...'
    } else {
      this._popupBtnSave.textContent = this._popupBtnSaveText
    }
  }
}