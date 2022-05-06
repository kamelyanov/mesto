import "./index.css";
import FormValidator from './scripts/components/FormValidator.js';
import Card from './scripts/components/Card.js';
import { initialCards } from './scripts/utils/initialCards.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import Api from './scripts/components/Api';

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
  validationSettings,
} from './scripts/utils/constans.js';

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: 'f7589185-ed99-4be1-a397-eccc85dc81c2',
    'Content-Type': 'application/json'
}
})

//загрузка карточек, данных пользователя с 
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    user
  })

  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 




//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ 
const createCard = (data) => {
  const card = new Card(data, templateSelector, () => popupWithImage.open(data));
  return card;
}

const cardsList = new Section({
    data: initialCards,
    renderer: (cardItem) => {
      const card = createCard(cardItem);
      const cardElement = card.renderNewCard()
      cardsList.setItem(cardElement);
    }
  },
    cardListSection
  );


//НАЧАЛЬНАЯ ОТРИСОВКА СЕКЦИИ КАРТОЧЕК
// const cardsList = new Section({
//   data: initialCards,
//   renderer: (cardItem) => {
//     const card = createCard(cardItem);
//     const cardElement = card.renderNewCard()
//     cardsList.setItem(cardElement);
//   }
// },
//   cardListSection
// );

// cardsList.renderItems();

//ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const copyInfo = new UserInfo(userInfoSelector);

//ПОПАП С ИЗМЕНЕНИЕМ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const popupEditingUser = new PopupWithForm(popupEditingFormSelector, (formData) => {
  copyInfo.setUserInfo(formData)
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
const popupAddCard = new PopupWithForm(popupCardAddSelector, (formData) => {
  const card = createCard(formData);
  const cardElement = card.renderNewCard()
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

