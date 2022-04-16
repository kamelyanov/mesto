export default class UserInfo {
  constructor(userInfoSelector) {
    this._userName = document.querySelector(userInfoSelector.name);
    this._userDesc = document.querySelector(userInfoSelector.desc);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      desc: this._userDesc.textContent,
    }
    return this._userInfo
  }

  setUserInfo(name, desc) {
    this._userName.textContent = name.value;
    this._userDesc.textContent = desc.value;
  }
}
