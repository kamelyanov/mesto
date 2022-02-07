let editFormButtonOpen = document.querySelector('.profile__name-edit')
let editForm = document.querySelector('.edit-form')
let editFormButtonGlose = editForm.querySelector('.edit-form__glose')

let editFormOpen = function () {
  editForm.classList.remove('edit-form');
  editForm.classList.add('edit-form_open');
};

let editFormGlose = function () {
  editForm.classList.remove('edit-form_open');
  editForm.classList.add('edit-form');
};

editFormButtonOpen.addEventListener('click', editFormOpen); 
editFormButtonGlose.addEventListener('click', editFormGlose);

let addProfileName = document.querySelector('.profile__info-name')

function addName() {
  let InputProfileName = document.querySelector(`.edit-form__name`);
  let InputProfileNameDescription = document.querySelector(`.edit-form__description`);

  addProfileName.innerHTML = `
  <h1 class="profile__name-title">${InputProfileName.value}</h1>
  <p class="profile__info-description">${InputProfileNameDescription.value}</p>
  `
}

let SaveFormName = document.querySelector(`.edit-form__btnsave`)
SaveFormName.addEventListener('click', addName) 
