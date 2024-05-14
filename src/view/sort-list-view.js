import {sortList} from "../mock/filters";
import {SortType} from "../const";
import AbstractView from "../framework/view/abstract-view";

const curBtn = 'day';

const createSortList = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${Object.values(SortType).map(item => `
              <div class="trip-sort__item  trip-sort__item--${item}">
                <input id="sort-${item}"
                       class="trip-sort__input  visually-hidden"
                       type="radio"
                       name="trip-sort"
                       value="sort-${item}" ${item === 'day' && `checked`} >
                <label class="trip-sort__btn" for="sort-${item}" data-sort-type="${item}">${item}</label>
              </div>`).join('')}
          </form>`
}
export default class SortListView extends AbstractView{
  #handleSortTypeChange = null;
  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler)
  }
  get template() {
    return createSortList();
  }

  #sortTypeChangeHandler = (e) => {
    if (e.target.tagName !== 'LABEL') {
      return;
    }

    this.#handleSortTypeChange(e.target.dataset.sortType);
  }
}
