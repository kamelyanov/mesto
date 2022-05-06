export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // отрисовка всех элементов
  renderItems(items) {
    items.forEach(item => this._renderer(item))
  }

  // добавление DOM-элемента в контейнер
  setItem(element) {
    this._container.prepend(element);
  }
}
