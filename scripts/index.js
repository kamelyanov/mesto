import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {initialCards} from './initialCards.js';

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__input-error_active'
}; 


const profileName = document.querySelector('.profile__name-title');
const profileDescription = document.querySelector('.profile__info-description');
const newCardButton = document.querySelector('.profile__add-button');
const formButtonOpenEdit = document.querySelector('.profile__name-edit');

// // 1 попап 
const editingForm = document.querySelector('.edit-form-popup');
const editingFormButtonGlose = document.querySelector('.edit-form__button-glose');
const inputProfileName = document.querySelector('.edit-form__input_type_name');
const inputProfileNameDescription = document.querySelector('.edit-form__input_type_description');
const formSaveName = document.querySelector('.edit-form__form');

// // 2 попап 
const cardAdd = document.querySelector('.add-card-popup');
const сardAddButtonGlose = document.querySelector('.add-card__button-glose');
const nameCardInput = document.querySelector('.add-card__input-type-namePhoto');
const linkCardPhotoInput = document.querySelector('.add-card__input-type-linkPhoto');
const cardAddForm = document.querySelector('.add-card__form');
const newCardSave = document.querySelector('.popup__btn-save-add-card');


// //3 попап 
export const imagePopup = document.querySelector('.image-popup-view');
export const photoInPopup = imagePopup.querySelector('.image-popup__photo');
export const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const imagePopupBtnClose = imagePopup.querySelector('.image-popup__button-glose');

// card
const cardsContainer = document.querySelector('.cards');

const formEditProfile = new FormValidator (validationSettings, editingForm);
const cardAddFormValidator = new FormValidator (validationSettings, cardAddForm);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();

export const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  addEventListener('keydown', closePopupByPressEsc);
};

const createNewCard = (card) => new Card(card, '#card-template').createNewCard();

const renderCards = (data) => {
  data.forEach(item => cardsContainer.append(createNewCard(item)));
};

renderCards(initialCards);

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  removeEventListener('keydown', closePopupByPressEsc);
  
};

const closePopupByOverlayClick = (event) =>{
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
};

const closePopupByPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const closePopupImage = function () {
  closePopup(imagePopup);
};

function copyInfo() {
  inputProfileName.value = profileName.textContent; 
  inputProfileNameDescription.value = profileDescription.textContent; 
};

const openProfileForm = function () {
  copyInfo();
  formEditProfile.checkFormValidity();
  openPopup(editingForm);
};

const closeEditForm = function () {
  closePopup(editingForm);
};

const openAddCard = function () {
  cardAddForm.reset();
  cardAddFormValidator.checkFormValidity(); 
  openPopup(cardAdd);
};

const addCard = () => {
  const newCard = createNewCard({
    name: nameCardInput.value,
    link: linkCardPhotoInput.value,
  }, '#card-template');

  cardsContainer.prepend(newCard);
};

const addNewCard = (evt) => {
  evt.preventDefault();
  closeAddCard();
  addCard();
  cardAddForm.reset();
};

const closeAddCard = function () {
  closePopup(cardAdd);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closeEditForm();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileNameDescription.value;
};

formSaveName.addEventListener('submit', handleProfileFormSubmit);
formButtonOpenEdit.addEventListener('click', openProfileForm);
editingFormButtonGlose.addEventListener('click', closeEditForm);

newCardButton.addEventListener('click', openAddCard);
сardAddButtonGlose.addEventListener('click', closeAddCard);
cardAddForm.addEventListener('submit', addNewCard);

cardAdd.addEventListener('click', closePopupByOverlayClick);
editingForm.addEventListener('click', closePopupByOverlayClick);
imagePopup.addEventListener('click', closePopupByOverlayClick);

imagePopupBtnClose.addEventListener('click', closePopupImage);





