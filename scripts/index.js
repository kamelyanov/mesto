import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {initialCards} from './initialCards.js';
import Section from './Section.js';
//import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {  
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
} from '../utils/constans.js'; 





// // 1 попап 

const editingFormButtonGlose = document.querySelector('.edit-form__button-glose');
const inputProfileName = document.querySelector('.edit-form__input_type_name');
const inputProfileNameDescription = document.querySelector('.edit-form__input_type_description');
const formSaveName = document.querySelector('.edit-form__form');

// // 2 попап 

const сardAddButtonGlose = document.querySelector('.add-card__button-glose');
const nameCardInput = document.querySelector('.add-card__input-type-namePhoto');
const linkCardPhotoInput = document.querySelector('.add-card__input-type-linkPhoto');

const newCardSave = document.querySelector('.popup__btn-save-add-card');


//3 попап 
//const imagePopup = document.querySelector('.image-popup-view');
///const photoInPopup = imagePopup.querySelector('.image-popup__photo');
//const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
//const imagePopupBtnClose = imagePopup.querySelector('.image-popup__button-glose');


const validationSettings = {
  formSelector: '.form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__input-error_active'
}; 

// profileName,
// profileDescription,
//ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const copyInfo = new UserInfo(userInfoSelector); 

//ПОПАП С ИЗМЕНЕНИЕМ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const popupEditingUser = new PopupWithForm (popupEditingFormSelector, () => {
  copyInfo.setUserInfo(inputProfileName, inputProfileNameDescription)
  popupEditingUser.close();
}) 

formButtonOpenEdit.addEventListener('click', () => {
  inputProfileName.value = copyInfo.getUserInfo().name
  inputProfileNameDescription.value = copyInfo.getUserInfo().desc
  popupEditingUser.open()
  formEditProfile.checkFormValidity()
})

popupEditingUser.setEventListeners()


//ПОПАП С ФОРМОЙ ДОБАВЛЕНИЯ КАРТОЧКИ 
const popupAddCard = new PopupWithForm(popupCardAddSelector, () => {
  const newValues = {
    name: nameCardInput.value,
    link: linkCardPhotoInput.value
  }

  const card = new Card(newValues, templateSelector, () => popupWithImage.open(newValues));
  const cardElement = card.createNewCard()
  cardsList.setItem(cardElement);
  popupAddCard.close();
})

popupAddCard.setEventListeners()
newCardButton.addEventListener('click', () => {
  popupAddCard.open()
  cardAddFormValidator.checkFormValidity()
})


//ПОПАП С КАРТИНКОЙ
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners()

//НАЧАЛЬНАЯ ОТРИСОВКА СЕКЦИИ КАРТОЧЕК
const cardsList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, templateSelector, () => popupWithImage.open(cardItem));
    const cardElement = card.createNewCard()
    cardsList.setItem(cardElement);
  }
}, 
cardListSection
); 

cardsList.renderItems();

//ВАЛИДАЦИЯ
const formEditProfile = new FormValidator (validationSettings, userNameEdit);
const cardAddFormValidator = new FormValidator (validationSettings, cardAdd);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();
