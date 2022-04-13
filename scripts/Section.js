export default class Section {
  constructor ({data, renderer}, templateSelector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(templateSelector);
  }

  // отрисовка всех элементов
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  // добавление DOM-элемента в контейнер
  addItem(element) {
    this._container.append(element);
  }
}