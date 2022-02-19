/*const initialCards = [
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
]; */

let editFormButtonOpen = document.querySelector('.profile__name-edit')
let editForm = document.querySelector('.edit-form')
let editFormButtonGlose = document.querySelector('.edit-form__button-glose')
let pagecover = document.querySelector('.page__cover')
let inputProfileName = document.querySelector('.edit-form__input_type_name');
let inputProfileNameDescription = document.querySelector('.edit-form__input_type_description');
let addProfileName = document.querySelector('.profile__name-title')
let addProfileDescription = document.querySelector('.profile__info-description')
let addNewCardButton = document.querySelector('.profile__add-button')
let addCard = document.querySelector('.add-card')
let addCardButtonGlose = document.querySelector('.add-card__button-glose')

function copyInfo() {  //заполнение имени и профессии из уже введенных
  inputProfileName.value = addProfileName.textContent;  //перенесли текст из уже введенного на страницы в поле ввода  
  inputProfileNameDescription.value = addProfileDescription.textContent; //то же  
  console.log('вызвали copyinfo')
}

let editFormOpen = function () {
  editForm.classList.add('popup-opened');
  pagecover.classList.add('page__cover_open') //делает прозрачным слой над страницей
  copyInfo();
};

let popupGlose = function () {
  console.log('нажали закрыть попап');
  editForm.classList.remove('popup-opened');
  addCard.classList.remove('popup-opened');
  pagecover.classList.remove('page__cover_open');
};

editFormButtonOpen.addEventListener('click', editFormOpen);
editFormButtonGlose.addEventListener('click', popupGlose);

let saveFormName = document.querySelector('.form');

function addName(evt) {
  evt.preventDefault();
  addProfileName.textContent = inputProfileName.value;
  addProfileDescription.textContent = inputProfileNameDescription.value;
  popupGlose();
}

saveFormName.addEventListener('submit', addName)

addNewCardButton.addEventListener('click', addCardOpen)

function addCardOpen() {
  console.log('кнопка добавить карточку работает');
  addCard.classList.add('popup-opened');
  pagecover.classList.add('page__cover_open') //делает прозрачным слой над страницей
}

addCardButtonGlose.addEventListener('click', popupGlose);







