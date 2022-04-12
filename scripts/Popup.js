export default class Popup {
  constructor (popup) {
    this._popup = document.querySelector(popup);
  }

  // слушатели закрытия 
  setEventListeners() {
    this._popupBtnClose = this._popup.querySelector('.popup__button-glose');
    this._popupBtnClose.addEvenListener('click', this._close)
  }

  //закрытие попапа кнопкой esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this._close();
    }
  }

  //закрытие попапа кликом на оверлей
  _closePopupByOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this._close();
    }
  };

  //открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    addEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    removeEventListener('keydown', this._handleEscClose);
  }
}
