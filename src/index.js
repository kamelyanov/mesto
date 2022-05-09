import "./index.css";
import FormValidator from './scripts/components/FormValidator.js';
import Card from './scripts/components/Card.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupConfirm from './scripts/components/PopupConfirm.js';
import UserInfo from './scripts/components/UserInfo.js';
import Api from './scripts/components/Api.js';

import {
  cardListSection,
  templateSelector,
  popupEditingFormSelector,
  popupCardAddSelector,
  popupWithImageSelector,
  newCardButton,
  formButtonOpenEdit,
  profileAvatarElement,
  cardAdd,
  userNameEdit,
  editAvatar,
  confirmDeleteSelector,
  editAvatarSelector,
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsList.renderItems(cards);
  })
  .catch((err) => console.log(err))

let userId 

//ВАЛИДАЦИЯ
const formEditProfile = new FormValidator(validationSettings, userNameEdit);
const cardAddFormValidator = new FormValidator(validationSettings, cardAdd);
const avatarEditPopupValidator = new FormValidator(validationSettings, editAvatar);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();
avatarEditPopupValidator.enableValidation();

//ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const userInfo = new UserInfo(userInfoSelector);

//ПОПАП С КАРТИНКОЙ
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners()

//ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ 
const confirmPopup = new PopupConfirm(confirmDeleteSelector)
confirmPopup.setEventListeners()

//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ 
const createCard = (data) => {
  const card = new Card(
    data, 
    templateSelector, 
    
    () => popupWithImage.open(data),
    () => card.toggleLikes(),    
    () => {
      confirmPopup.setSubmitAction(() => {
        confirmPopup.renderLoading(true)
        api.deleteCard(data._id)
          .then( _ => {
            card.deleteCard()
            confirmPopup.close()
          })
          .catch((err) => console.log(err))
          .finally( _ => confirmPopup.renderLoading(false))
      })
      confirmPopup.open()
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

popupEditingUser.setEventListeners()

formButtonOpenEdit.addEventListener('click', () => {
  inputProfileName.value = userInfo.getUserInfo().name
  inputProfileNameDescription.value = userInfo.getUserInfo().about
  popupEditingUser.open()
  formEditProfile.checkFormValidity()
})



// ПОПАП ИЗМЕНЕНИЯ АВАТАРА
const popupEditingUserAvatar = new PopupWithForm(editAvatarSelector, (formData) => {
  popupEditingUserAvatar.renderLoading(true)
  api.setUserAvatar(formData)
  .then((formData) => {
    userInfo.setUserInfo(formData)
    popupEditingUserAvatar.close()
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupEditingUserAvatar.renderLoading(false)
  })
})

profileAvatarElement.addEventListener('click', () => {
  popupEditingUserAvatar.open()
  avatarEditPopupValidator.checkFormValidity()
})

popupEditingUserAvatar.setEventListeners()

//ПОПАП С ФОРМОЙ ДОБАВЛЕНИЯ КАРТОЧКИ 
const popupAddCard = new PopupWithForm(popupCardAddSelector, (formData) => {
  popupAddCard.renderLoading(true)
  api.addCard(formData)
  .then((data) => {
    const card = createCard(data);
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


