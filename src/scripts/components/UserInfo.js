export default class UserInfo {
  constructor(userInfoSelector) {
    this._userName = document.querySelector(userInfoSelector.name);
    this._userDesc = document.querySelector(userInfoSelector.about);
    this._userAvatar = document.querySelector(userInfoSelector.avatar);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      about: this._userDesc.textContent,
    }
    return this._userInfo
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDesc.textContent = data.about;
    this._userAvatar.style["background-image"] = `url('${data.avatar}')`;
  }
}
