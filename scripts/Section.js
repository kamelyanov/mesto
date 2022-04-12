export default class Section {
  constructor ({items, renderer} , templateSelector) {
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(templateSelector);
  }

  // отрисовка всех элементов
  renderItems(data) {
    data.forEach(item => 
      this._renderer(item))
  } 

  // renderItems() {
  //   this.clear();
  
  //   this._renderedItems.forEach((item) => {
  //     this._renderer(item);
  //   });
  // } 

  // добавление DOM-элемента в контейнер
  addItem(element) {
    this._container.append(element);
  }
}