const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const addProfileName = document.querySelector('.profile__name-title');
const addProfileDescription = document.querySelector('.profile__info-description');
const addNewCardButton = document.querySelector('.profile__add-button');
const editFormButtonOpen = document.querySelector('.profile__name-edit');

// 1 попап 
const editForm = document.querySelector('.edit-form-popup');
const editFormButtonGlose = document.querySelector('.edit-form__button-glose');
const inputProfileName = document.querySelector('.edit-form__input_type_name');
const inputProfileNameDescription = document.querySelector('.edit-form__input_type_description');
const saveFormName = document.querySelector('.edit-form__form');

// 2 попап 
const addCard = document.querySelector('.add-card-popup');
const addCardButtonGlose = document.querySelector('.add-card__button-glose');
const inputNameCard = document.querySelector('.add-card__input-type-namePhoto');
const inputLinkCardPhoto = document.querySelector('.add-card__input-type-linkPhoto');
const addCardForm = document.querySelector('.add-card__form');
const saveNewCard = document.querySelector('.popup__btn-save-add-card');

//3 попап 
const imagePopup = document.querySelector('.image-popup-view');
const photoInPopup = imagePopup.querySelector('.image-popup__photo');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const imagePopupBtnClose = imagePopup.querySelector('.image-popup__button-glose');


// card
const templateCard = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

const openPopup = function (popup) {
  popup.classList.add('popup-opened');
}

const closePopup = function (popup) {
  popup.classList.remove('popup-opened');
}

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

const createNewCard = function (item) {
  const { name, link } = item;
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
  //closePopup(addCard);
}

function copyInfo() {  //заполнение имени и профессии из уже введенных
  inputProfileName.value = addProfileName.textContent;  //перенесли текст из уже введенного на страницы в поле ввода  
  inputProfileNameDescription.value = addProfileDescription.textContent; //то же  
}


const openProfileForm = function () {
  openPopup(editForm);
  copyInfo();
  checkFormValidity(editForm);
}

const closeEditForm = function () {
  closePopup(editForm);
}

const openAddCard = function () {
  openPopup(addCard);
  checkFormValidity(addCard);
}

const addNewCard = function (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createNewCard({ name: inputNameCard.value, link: inputLinkCardPhoto.value }));
  addCardForm.reset();
  closeAddCard();
}

const closeAddCard = function () {
  closePopup(addCard);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  addProfileName.textContent = inputProfileName.value;
  addProfileDescription.textContent = inputProfileNameDescription.value;
  closeEditForm();
}

saveFormName.addEventListener('submit', handleProfileFormSubmit);
editFormButtonOpen.addEventListener('click', openProfileForm);
editFormButtonGlose.addEventListener('click', closeEditForm);

addNewCardButton.addEventListener('click', openAddCard);
addCardButtonGlose.addEventListener('click', closeAddCard);
addCardForm.addEventListener('submit', addNewCard);

imagePopupBtnClose.addEventListener('click', closePopupImage);

renderCards(initialCards);


const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.closest(".form__field").querySelector('.edit-form__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('edit-form__input-error_active')
}

const hideError = (formElement, inputElement) => {
  const errorElement = inputElement.closest(".form__field").querySelector('.edit-form__input-error');
  errorElement.textContent = '';
  errorElement.classList.remove('edit-form__input-error_active')
}

const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, submitButtonElement) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add('popup__btn-save_inactive');
    submitButtonElement.setAttribute('disabled', true)
  } else {
    submitButtonElement.classList.remove('popup__btn-save_inactive');
    submitButtonElement.removeAttribute('disabled')
  };
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__input'));
  const submitButtonElement = formElement.querySelector('.popup__btn-save');
  toggleButtonState(inputList, submitButtonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      console.log(event.target.name, event.target.value);
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement); //чтобы проверять при измененеии полей 
    });
  });
};

const checkFormValidity = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__input'));
  const submitButtonElement = formElement.querySelector('.popup__btn-save');
  toggleButtonState(inputList, submitButtonElement);
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();