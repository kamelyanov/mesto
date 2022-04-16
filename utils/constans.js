const cardListSection = '.cards'; //селектор секция с карточками
const templateSelector = '#card-template'; //  селектор template cards

const popupEditingFormSelector = '.edit-form-popup'; //селектор изменения данных пользователя
const popupCardAddSelector = '.add-card-popup'; // селектор попапа с формой добавления карточки

const popupWithImageSelector = '.image-popup-view'; //cелектор попапа с фото


const cardAddFormSelector = ('.add-card__form'); // селектор форма добавления  карточки
const userNameEditFormSelector = ('.edit-form-popup'); // селектор формы изменения имени

const newCardButton = document.querySelector('.profile__add-button');//кнопка открытия попапа добавления карточки
const formButtonOpenEdit = document.querySelector('.profile__name-edit'); //кнопка изменения имени

const imagePopup = document.querySelector('.image-popup-view'); //попап с большой картинкой 
const photoInPopup = imagePopup.querySelector('.image-popup__photo'); // картинка в попапе
const imagePopupTitle = imagePopup.querySelector('.image-popup__title'); //подпись картинки в попапе


const cardAdd = document.querySelector('.add-card-popup'); // попап добавления  карточки
const userNameEdit = document.querySelector('.edit-form-popup'); //попап изменения имени


const profileNameSelector = ('.profile__name-title');
const profileDescriptionSelector = ('.profile__info-description');
const profileName = document.querySelector('.add-card-popup') 


const userInfoSelector = { //объект с данными пользователя 
  name: profileNameSelector,
  desc: profileDescriptionSelector,
} 



export {
  cardListSection, 
  templateSelector,

  popupCardAddSelector,
  popupEditingFormSelector,
  popupWithImageSelector,
  
  imagePopup,
  photoInPopup,
  imagePopupTitle,
  userNameEditFormSelector,
  cardAdd,
  userNameEdit,
  cardAddFormSelector,
  newCardButton,
  formButtonOpenEdit, 

  userInfoSelector,
  profileName
}