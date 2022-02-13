let editFormButtonOpen = document.querySelector('.profile__name-edit') 
let editForm = document.querySelector('.edit-form')
let editFormButtonGlose = editForm.querySelector('.edit-form__glose')
let pagecover = document.querySelector('.page__cover')
let inputProfileName = document.querySelector('.edit-form__input_type_name');
let inputProfileNameDescription = document.querySelector('.edit-form__input_type_description');
let addProfileName = document.querySelector('.profile__name-title')
let addProfileDescription = document.querySelector('.profile__info-description')


function copyInfo () {  //заполнение имени и профессии из уже введенных
  inputProfileName.value = addProfileName.textContent;  //перенесли текст из уже введенного на страницы в поле ввода  
  inputProfileNameDescription.value = addProfileDescription.textContent; //то же  
  console.log ('вызвали copyinfo')
}

let editFormOpen = function () {
  editForm.classList.add('edit-form_open'); 
  pagecover.classList.add('page__cover_open') //делает прозрачным слой над страницей
  copyInfo ();
};

let editFormGlose = function () {
  editForm.classList.remove('edit-form_open');
  pagecover.classList.remove('page__cover_open');
};

editFormButtonOpen.addEventListener('click', editFormOpen); 
editFormButtonGlose.addEventListener('click', editFormGlose);

let saveFormName = document.querySelector('.form');

function addName(evt) {
  evt.preventDefault();
  addProfileName.textContent = inputProfileName.value;
  addProfileDescription.textContent = inputProfileNameDescription.value;
  editFormGlose();
}

saveFormName.addEventListener('submit', addName) 

