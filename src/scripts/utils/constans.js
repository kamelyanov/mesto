const cardListSection = '.cards'; //селектор секция с карточками
const templateSelector = '#card-template'; //  селектор template cards

const popupEditingFormSelector = '.edit-form-popup'; //селектор изменения данных пользователя
const popupCardAddSelector = '.add-card-popup'; // селектор попапа с формой добавления карточки
const popupWithImageSelector = '.image-popup-view'; //cелектор попапа с фото
const confirmDeleteSelector = '.confirm-popup'; //селектор попапа подтверждения удаления карточки
const editAvatarSelector = '.update-avatar-popup'; //попап изменения аватарки


const newCardButton = document.querySelector('.profile__add-button');//кнопка открытия попапа добавления карточки
const formButtonOpenEdit = document.querySelector('.profile__name-edit'); //кнопка изменения имени
const profileAvatarElement = document.querySelector('.profile__avatar'); //аватар на странице DOM element 

const cardAdd = document.querySelector('.add-card-popup'); // попап добавления  карточки
const userNameEdit = document.querySelector('.edit-form-popup'); //попап изменения имени
const editAvatar = document.querySelector('.update-avatar-popup'); //попап изменения аватарки


const profileNameSelector = ('.profile__name-title'); //Селектор имени пользователя 
const profileDescriptionSelector = ('.profile__info-description');  //Селектор описания пользователя
const profileAvatarSelector = ('.profile__avatar') //Селектор Аватара

const inputProfileName = document.querySelector('.edit-form__input_type_name'); //поле изменения имени пользователя 
const inputProfileNameDescription = document.querySelector('.edit-form__input_type_description'); //поле изменения описания пользователя
const inputProfileAvatar = document.querySelector('edit-form__input-type-linkNewAvatar'); //поле изменения ссылки на аватарку

const userInfoSelector = { //объект с данными пользователя 
  name: profileNameSelector,
  desc: profileDescriptionSelector,
  avatar: profileAvatarSelector
}

//настройки валидации
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__input-error_active'
};

export {
  cardListSection,
  templateSelector,
  popupEditingFormSelector,
  popupCardAddSelector,
  popupWithImageSelector,
  newCardButton,
  formButtonOpenEdit,
  profileAvatarElement,
  cardAdd,
  userNameEdit,
  editAvatar,
  confirmDeleteSelector,
  editAvatarSelector,
  profileAvatarSelector,
  inputProfileName,
  inputProfileNameDescription,
  inputProfileAvatar,
  userInfoSelector,
  validationSettings,
}