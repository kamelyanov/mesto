let editFormButtonOpen = document.querySelector('.profile__name-edit')
let editForm = document.querySelector('.edit-form')
let editFormButtonGlose = editForm.querySelector('.edit-form_glose')

let editFormOpen = function () {
  editForm.classList.add('edit-form_open');
};

let editFormGlose = function () {
  editForm.classList.remove('edit-form_open');
};

editFormButtonOpen.addEventListener('click', editFormOpen);
editFormButtonGlose.addEventListener('click', editFormGlose);

let addProfileName = document.querySelector('.profile__info-name')


console.log(addProfileName)

function addName() {
  let InputProfileName = document.querySelector(`.input__text_name`);
  let InputProfileNameDescription = document.querySelector(`.input__text_description`);

  addProfileName.innerHTML = `
  <h1 class="profile__name-title">${InputProfileName.value}</h1>
  <p class="profile__info-description">${InputProfileNameDescription.value}</p>
  `
}
let SaveFormName = document.querySelector(`.form__submit-btn_save`)
SaveFormName.addEventListener('click', addName) 
