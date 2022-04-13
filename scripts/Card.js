export default class Card {
  constructor (data, templateSelector, handleCardClick) {
    this._name = data.name; 
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  
  _toggleLikes = () => {
    this._cardLike.classList.toggle('card__like_active');
  }

  _deleteCard = () => {
    this._card.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._cardLike.addEventListener('click', this._toggleLikes);
    this._cardDeleteButton = this._card.querySelector('.card__delete');
    this._cardDeleteButton.addEventListener('click', this._deleteCard);
  }

  _getElement() {
    this._card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  createNewCard() {
    this._getElement();
    this._cardLike = this._card.querySelector('.card__like');
    
    this._cardImage = this._card.querySelector('.card__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
       
    return this._card;
  }
}
