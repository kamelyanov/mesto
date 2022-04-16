import "./index.css";
import FormValidator from './scripts/components/FormValidator.js';
import Card from './scripts/components/Card.js';
import { initialCards } from './scripts/utils/initialCards.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';

import {
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
} from './scripts/utils/constans.js';

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

//ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const copyInfo = new UserInfo(userInfoSelector);

//ПОПАП С ИЗМЕНЕНИЕМ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const popupEditingUser = new PopupWithForm(popupEditingFormSelector, () => {
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

//ВАЛИДАЦИЯ
const formEditProfile = new FormValidator(validationSettings, userNameEdit);
const cardAddFormValidator = new FormValidator(validationSettings, cardAdd);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();
