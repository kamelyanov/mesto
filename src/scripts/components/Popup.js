export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  }

  // слушатели закрытия 
  setEventListeners() {
    this._popupBtnClose = this._popup.querySelector('.popup__button-glose');
    this._popupBtnClose.addEventListener('click', () => this.close())
    this._popup.addEventListener('click', this._closePopupByOverlayClick)
  }

  //закрытие попапа кнопкой esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //закрытие попапа кликом на оверлей
  _closePopupByOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  //открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
