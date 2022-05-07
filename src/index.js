import "./index.css";
import FormValidator from './scripts/components/FormValidator.js';
import Card from './scripts/components/Card.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupConfirm from './scripts/components/PopupConfirm';
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
  editAvatar,
  confirmDeleteCard,
  profileAvatar,
  inputProfileName,
  inputProfileNameDescription,
  inputProfileAvatar,
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

let userId 
//загрузка карточек, данных пользователя с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({
      name: user.name,
      desc: user.about,
      avatar: user.avatar,
      id: user._id
    });
    cardsList.renderItems(cards)
  })
  .catch((err) => console.log(err))


  
//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ 
const createCard = (data) => {
  const card = new Card(
    data, 
    templateSelector, 
    () => popupWithImage.open(data),
    () => {
      confirmDeleteCardPopup.setSubmitAction
      confirmDeleteCardPopup.renderLoading
      api.deleteCard(data._id)
        .then(() => {
          card.deleteCard()
          confirmDeleteCardPopup.close()
        })
        .catch((err) => console.log(err))
        .finally(() => {
          confirmDeleteCardPopup.renderLoading(false)
        })
      confirmDeleteCardPopup.open()
    }, 
    api,
    userId,
  );
  return card;
}

//Секция
const cardsList = new Section(
  (cardItem) => {
    const card = createCard(cardItem);
    const cardElement = card.renderNewCard()
    cardsList.setItem(cardElement);
  },
  cardListSection
)

//ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const userInfo = new UserInfo(userInfoSelector);

//ПОПАП С ИЗМЕНЕНИЕМ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const popupEditingUser = new PopupWithForm(popupEditingFormSelector, (formData) => {
  popupEditingUser.renderLoading(true)
  api.setUserInfo(formData)
  .then((formData) => {
    userInfo.setUserInfo(formData)
    popupEditingUser.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupEditingUser.renderLoading(false)
  })
})

formButtonOpenEdit.addEventListener('click', () => {
  inputProfileName.value = userInfo.getUserInfo().name
  inputProfileNameDescription.value = userInfo.getUserInfo().desc
  popupEditingUser.open()
  formEditProfile.checkFormValidity()
})

popupEditingUser.setEventListeners()

//ПОПАП ИЗМЕНЕНИЯ АВАТАРА
// const popupEditingUserAvatar = new PopupWithForm(editAvatar, (formData) => {
//   //editAvatar.renderLoading(true)
//   api.setUserAvatar(formData)
//     .then((data) => {
//       userInfo.setUserInfo(data)
//   })
// })

// // profileAvatar.addEventListener('click', () => {
// //   popupEditingUserAvatar.open()
// //   //avatarEditPopupValidator.checkFormValidity()
// // })


// //popupEditingUserAvatar.setEventListeners()



//ПОПАП С ФОРМОЙ ДОБАВЛЕНИЯ КАРТОЧКИ 
const popupAddCard = new PopupWithForm(popupCardAddSelector, (formData) => {
  popupAddCard.renderLoading(true)
  api.addCard(formData)
  .then((formData) => {
    const card = createCard(formData);
    const cardElement = card.renderNewCard()
    cardsList.setItem(cardElement);
    popupAddCard.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupAddCard.renderLoading(false)
  })
})

popupAddCard.setEventListeners()

newCardButton.addEventListener('click', () => {
  popupAddCard.open()
  cardAddFormValidator.checkFormValidity()
})

//ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ 
const confirmDeleteCardPopup = new PopupConfirm(confirmDeleteCard)
confirmDeleteCardPopup.setEventListeners()




//ПОПАП С КАРТИНКОЙ
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners()

//ВАЛИДАЦИЯ
const formEditProfile = new FormValidator(validationSettings, userNameEdit);
const cardAddFormValidator = new FormValidator(validationSettings, cardAdd);
const avatarEditPopupValidator = new FormValidator(validationSettings, editAvatar);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();
avatarEditPopupValidator.enableValidation();