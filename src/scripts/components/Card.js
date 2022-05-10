export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardLike, handleConfirmDeleteCard, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._likes = data.likes
    
    this._handleCardClick = handleCardClick;
    this._handleConfirmDeleteCard = handleConfirmDeleteCard;
    this._handleCardLike = handleCardLike;

    this._api = api;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;

  }

  toggleLikes() {   
    if (!(this._cardLikeBtn.classList.contains('card__like_active'))) {
      this._api.like(this._id)
        .then((data) => {
          this._cardLikeBtn.classList.add('card__like_active')
          this._cardlikeCounter.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      this._api.deleteLike(this._id)
        .then((data) => {
          this._cardLikeBtn.classList.remove('card__like_active')
          this._cardlikeCounter.textContent = data.likes.length
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
    this._cardLikeBtn.addEventListener('click', this._handleCardLike);
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
            
    this._cardDeleteButton = this._card.querySelector('.card__delete');  
    this._cardLikeBtn = this._card.querySelector('.card__like');
    this._cardlikeCounter = this._card.querySelector('.card__likeCounter');

    this._cardlikeCounter.textContent = this._likes.length;

    this._cardImage = this._card.querySelector('.card__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardTitle = this._card.querySelector('.card__title');
    this._cardTitle.textContent = this._name;
    
    
    if (this._ownerId !== this._userId) {
      this._cardDeleteButton.style.display = 'none'
    }
    
    if(this._likes.some((obj) => this._userId == obj._id)) {
      this._cardLikeBtn.classList.add('card__like_active')
    }
       
    this._setEventListeners();
    
    return this._card;
  }
}
