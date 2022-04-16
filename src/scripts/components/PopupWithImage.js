import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._photoInPopup = this._popup.querySelector('.image-popup__photo');
    this._imagePopupTitle = this._popup.querySelector('.image-popup__title');
  }

  open(data) {
    super.open()
    this._photoInPopup.src = data.link;
    this._photoInPopup.alt = data.name;
    this._imagePopupTitle.textContent = data.name;
  }
}
