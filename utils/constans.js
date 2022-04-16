const cardListSection = '.cards'; //селектор секция с карточками
const templateSelector = '#card-template'; //  селектор template cards

const popupEditingFormSelector = '.edit-form-popup'; //селектор изменения данных пользователя
const popupCardAddSelector = '.add-card-popup'; // селектор попапа с формой добавления карточки
const popupWithImageSelector = '.image-popup-view'; //cелектор попапа с фото

const newCardButton = document.querySelector('.profile__add-button');//кнопка открытия попапа добавления карточки
const formButtonOpenEdit = document.querySelector('.profile__name-edit'); //кнопка изменения имени

const cardAdd = document.querySelector('.add-card-popup'); // попап добавления  карточки
const userNameEdit = document.querySelector('.edit-form-popup'); //попап изменения имени

const profileNameSelector = ('.profile__name-title'); //Селектор имени пользователя 
const profileDescriptionSelector = ('.profile__info-description');  //Селектор описания пользователя

const inputProfileName = document.querySelector('.edit-form__input_type_name'); //поле изменения имени пользователя 
const inputProfileNameDescription = document.querySelector('.edit-form__input_type_description'); //поле изменения описания пользователя

const userInfoSelector = { //объект с данными пользователя 
  name: profileNameSelector,
  desc: profileDescriptionSelector,
}

const nameCardInput = document.querySelector('.add-card__input-type-namePhoto');  //поле ввода названия новой карточки 
const linkCardPhotoInput = document.querySelector('.add-card__input-type-linkPhoto'); //полсе ввода ссылки

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
  cardAdd,
  userNameEdit,
  inputProfileName,
  inputProfileNameDescription,
  userInfoSelector,
  nameCardInput,
  linkCardPhotoInput,
  validationSettings,
}