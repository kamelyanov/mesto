export default class Card {
  constructor(data, templateSelector, handleCardClick, handleConfirmDeleteCard, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._likes = data.likes
    
    this._handleCardClick = handleCardClick;
    this._handleConfirmDeleteCard = handleConfirmDeleteCard;

    this._api = api;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
  }

  _toggleLikes = () => {
    const cardLikeBtn = this._card.querySelector('.card__like');
    const cardlikeCounter = this._card.querySelector('.card__likeCounter');

    if (!(cardLikeBtn.classList.contains('card__like_active'))) {
      this._api.like(this._id)
        .then((data) => {
          cardLikeBtn.classList.add('card__like_active')
          cardlikeCounter.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      this._api.deleteLike(this._id)
        .then((data) => {
          cardLikeBtn.classList.remove('card__like_active')
          cardlikeCounter.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  deleteCard = () => {
    this._card.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._cardLikeBtn = this._card.querySelector('.card__like');
    this._cardLikeBtn.addEventListener('click', this._toggleLikes);
    this._cardDeleteButton = this._card.querySelector('.card__delete');
    this._cardDeleteButton.addEventListener('click', this._handleConfirmDeleteCard);
  }

  _getElement() {
    this._card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  renderNewCard() {
    this._getElement();
  
    this._cardImage = this._card.querySelector('.card__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardTitle = this._card.querySelector('.card__title');
    this._cardTitle.textContent = this._name;
    
    if (this._ownerId !== this._userId) {
      this._card.querySelector('.card__delete').style.display = 'none'
    }

    if (this._likes.find((obj) => this._userId === obj._id)) {
      const cardLikeBtn = this._card.querySelector('.card__like');
      cardLikeBtn.classList.add('card__like_active')
    }
    
    this._setEventListeners();

    return this._card;
  }
}
