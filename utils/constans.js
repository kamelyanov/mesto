const cardsContainer = document.querySelector('.cards'); //секция с карточками
const templateSelector = document.querySelector('.card-template'); //template cards

const imagePopup = document.querySelector('.image-popup-view'); //попап с большой картинкой 
const photoInPopup = imagePopup.querySelector('.image-popup__photo'); // картинка в попапе
const imagePopupTitle = imagePopup.querySelector('.image-popup__title'); //подпись картинки в попапе

const editingForm = document.querySelector('.edit-form-popup'); // форма изменения имени
const cardAdd = document.querySelector('.add-card-popup'); // попап добавления  карточки
const cardAddForm = document.querySelector('.add-card__form'); // форма добавления  карточки

export {
  cardsContainer, 
  templateSelector,
  imagePopup,
  photoInPopup,
  imagePopupTitle,
  editingForm,
  cardAdd,
  cardAddForm
}