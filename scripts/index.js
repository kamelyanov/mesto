const profileName = document.querySelector('.profile__name-title');
const profileDescription = document.querySelector('.profile__info-description');
const newCardButton = document.querySelector('.profile__add-button');
const formButtonOpenEdit = document.querySelector('.profile__name-edit');

// 1 попап 
const editingForm = document.querySelector('.edit-form-popup');
const editingFormButtonGlose = document.querySelector('.edit-form__button-glose');
const inputProfileName = document.querySelector('.edit-form__input_type_name');
const inputProfileNameDescription = document.querySelector('.edit-form__input_type_description');
const saveFormName = document.querySelector('.edit-form__form');

// 2 попап 
const cardAdd = document.querySelector('.add-card-popup');
const сardAddButtonGlose = document.querySelector('.add-card__button-glose');
const nameCardInput = document.querySelector('.add-card__input-type-namePhoto');
const linkCardPhotoInput = document.querySelector('.add-card__input-type-linkPhoto');
const cardAddForm = document.querySelector('.add-card__form');
const newCardSave = document.querySelector('.popup__btn-save-add-card');

//3 попап 
const imagePopup = document.querySelector('.image-popup-view');
const photoInPopup = imagePopup.querySelector('.image-popup__photo');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const imagePopupBtnClose = imagePopup.querySelector('.image-popup__button-glose');

// card
const templateCard = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  addEventListener('keydown', closePopupByPressEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  removeEventListener('keydown', closePopupByPressEsc);
  
}

// const resetInputPopup = (popup) => {
//   inputFormPopup.reset();
// }

const closePopupByOverlayClick = (event) =>{
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

const closePopupByPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const toggleLikes = function (evt) {
  evt.target.classList.toggle('card__like_active');
}

const deleteCard = function (evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

const openPopupImage = function (evt) {
  photoInPopup.src = evt.target.src;
  photoInPopup.alt = evt.target.alt;
  imagePopupTitle.textContent = evt.target.alt;
  openPopup(imagePopup);
}

const closePopupImage = function () {
  closePopup(imagePopup);
}

const createNewCard = function ({name, link}) {
  const card = templateCard.cloneNode(true);

  const cardImage = card.querySelector('.card__photo');
  cardImage.addEventListener('click', openPopupImage);
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = name;

  const cardLike = card.querySelector('.card__like');
  cardLike.addEventListener('click', toggleLikes);

  const cardDeleteButton = card.querySelector('.card__delete');
  cardDeleteButton.addEventListener('click', deleteCard);

  return card;
}

const renderCards = function (data) {
  data.forEach(item => cardsContainer.append(createNewCard(item)));
}

function copyInfo() {  //заполнение имени и профессии из уже введенных
  inputProfileName.value = profileName.textContent;  //перенесли текст из уже введенного на страницы в поле ввода  
  inputProfileNameDescription.value = profileDescription.textContent; //то же  
}

const openProfileForm = function () {
  openPopup(editingForm);
  copyInfo();
  checkFormValidity(editingForm, validationSettings);
}

const closeEditForm = function () {
  closePopup(editingForm);
}

const openAddCard = function () {
  cardAddForm.reset();
  openPopup(cardAdd);
  checkFormValidity(cardAdd, validationSettings);
}

const addNewCard = function (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createNewCard({ name: nameCardInput.value, link: linkCardPhotoInput.value }));
  cardAddForm.reset();
  closeAddCard();
}

const closeAddCard = function () {
  closePopup(cardAdd);
};

const closePopupByPressEscAddCard = () => {
  closePopupByPressEsc (evt, cardAdd);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileNameDescription.value;
  closeEditForm();
}

saveFormName.addEventListener('submit', handleProfileFormSubmit);
formButtonOpenEdit.addEventListener('click', openProfileForm);
editingFormButtonGlose.addEventListener('click', closeEditForm);

newCardButton.addEventListener('click', openAddCard);
сardAddButtonGlose.addEventListener('click', closeAddCard);
cardAddForm.addEventListener('submit', addNewCard);
cardAdd.addEventListener('click', closePopupByOverlayClick);
editingForm.addEventListener('click', closePopupByOverlayClick);
imagePopup.addEventListener('click', closePopupByOverlayClick);

imagePopupBtnClose.addEventListener('click', closePopupImage);

renderCards(initialCards);

