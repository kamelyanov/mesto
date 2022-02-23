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

const pagecover = document.querySelector('.page__cover');
// 1 попап 
const editForm = document.querySelector('.edit-form');
const editFormButtonGlose = document.querySelector('.edit-form__button-glose');
const inputProfileName = document.querySelector('.edit-form__input_type_name');
const inputProfileNameDescription = document.querySelector('.edit-form__input_type_description');
const saveFormName = document.querySelector('.form__edit-form');

// 2 попап 
const addCard = document.querySelector('.add-card');
const addCardButtonGlose = document.querySelector('.add-card__button-glose');
const inputNameCard = document.querySelector('.add-card__input_type_namePhoto');
const inputLinkCardPhoto = document.querySelector('.add-card__input_type_linkPhoto');
const addCardForm = document.querySelector('.form__add-card');

//3 попап 
const imagePopup = document.querySelector('.image-popup');
const photoInPopup = imagePopup.querySelector('.image-popup__photo');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const imagePopupBtnClose = imagePopup.querySelector('.image-popup__button-glose');


// card
const templateCard = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

const openPopup = function (popup) {
  popup.classList.add('popup-opened');
  pagecover.classList.add('page__cover_open') //делает прозрачным слой над страницей
}

const closePopup = function (popup) {
  popup.classList.remove('popup-opened');
  pagecover.classList.remove('page__cover_open')
}

const cardLiked = function (evt) {
  console.log('нажали лайк', evt.target);
  evt.target.classList.toggle('card__like_active');
}

const cardDelete = function (evt) {
  console.dir(evt.target);
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

const openPopupImage = function (evt) {
  photoInPopup.src = evt.target.src;
  photoInPopup.alt = evt.target.alt;
  imagePopupTitle.textContent = evt.target.alt;
  openPopup(imagePopup);
}

const closePopupImage = function() {
  console.log('закрыли');
  closePopup(imagePopup);
}

const createNewCard = function (item) {
  const { name, link } = item; 
  // const name = card.name; 
  // const link = card.link; 
  const card = templateCard.cloneNode(true);

  const cardImage = card.querySelector('.card__photo');
  cardImage.addEventListener('click', openPopupImage); 
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = name; 

  const cardLike = card.querySelector('.card__like');
  cardLike.addEventListener('click', cardLiked); 

  const cardDeleteButton = card.querySelector('.card__delete'); 
  cardDeleteButton.addEventListener('click', cardDelete); 
  
  return card;
}

const renderCards = function(data) {
  data.forEach(item => cardsContainer.append(createNewCard(item)));
} 

function copyInfo() {  //заполнение имени и профессии из уже введенных
  inputProfileName.value = addProfileName.textContent;  //перенесли текст из уже введенного на страницы в поле ввода  
  inputProfileNameDescription.value = addProfileDescription.textContent; //то же  
  console.log('вызвали copyinfo')
}

const editFormOpen = function () {
  openPopup(editForm);
  copyInfo();
}

const editFormClose = function () {
  closePopup(editForm);
}

const addCardOpen = function () {
  openPopup(addCard);
  console.log('кнопка добавить карточку работает');
}
//создали объекn  из ввведенных в поппапе данных - 
//вызвали создание карточки с этмими данными, 
// добавили карточку в начало контейнера с карточками
const addNewCard = function(evt) {
  evt.preventDefault();
  // console.log(inputNameCard.value,  inputLinkCardPhoto.value);
  // const obj = {
  //   name: inputNameCard.value,
  //   link: inputLinkCardPhoto.value
  // }
  // const temp = createNewCard(obj); 
  // console.log(temp);
  cardsContainer.prepend(createNewCard({name: inputNameCard.value, link: inputLinkCardPhoto.value}))
}

addCardForm.addEventListener('submit', addNewCard); //вызвывает функцию которая добавляет новую карточку, очищает поля и закрыавет попап

const addCardClose = function () {
  closePopup(addCard);
};

function addName(evt) {
  evt.preventDefault();
  addProfileName.textContent = inputProfileName.value;
  addProfileDescription.textContent = inputProfileNameDescription.value;
  editFormClose();
}

saveFormName.addEventListener('submit', addName);
editFormButtonOpen.addEventListener('click', editFormOpen);
editFormButtonGlose.addEventListener('click', editFormClose);

addNewCardButton.addEventListener('click', addCardOpen);
addCardButtonGlose.addEventListener('click', addCardClose);


imagePopupBtnClose.addEventListener('click', closePopupImage);

renderCards(initialCards); 

