import {createElement} from "../render";
import {
  createPointDate,
  createTimeFormat,
  createDurationPeriod
} from "../utils";
import AbstractView from "../framework/view/abstract-view";

const createDestinationItem = (pointData, allOffers) => {

  const {
    type,
    finishPoint,
    base_price,
    startDate,
    startTime,
    endTime,
    offers
  } = pointData;

  const pointDate = createPointDate(startDate);
  const option = `${type} ${finishPoint}`
  const startPeriod = createTimeFormat(startTime);
  const endPeriod = createTimeFormat(endTime);
  const timePeriod = createDurationPeriod(startTime, endTime)

  const offerByType = allOffers.find(item => item.type === type);
  const renderOffersItem = (item) => {
    return offers.includes(item.id) ?
      `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        <span class="event__offer-price">${item.price}</span>
      </li>` : '';
  }

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${pointDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${option}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${startPeriod}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${endPeriod}</time>
                  </p>
                  <p class="event__duration">${timePeriod}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${base_price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>

                <ul class="event__selected-offers">
                    ${offerByType.offers.map(item => renderOffersItem(item)).join('')}
                </ul>

                <button class="event__favorite-btn event__favorite-btn--active" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
}

export default class DestinationItemView extends AbstractView {
  #pointData;
  #allOffers;
  #handleEditClick;
  constructor({pointData, allOffers, onEditForm}) {
    super();
    this.#pointData = pointData;
    this.#allOffers = allOffers;
    this.#handleEditClick = onEditForm;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickEditHandler);
  }
  get template() {
    return createDestinationItem(this.#pointData, this.#allOffers);
  }

  #clickEditHandler = (e) => {
    e.preventDefault();
    this.#handleEditClick();
  }
}
