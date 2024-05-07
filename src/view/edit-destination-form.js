import {createElement} from "../render";
import {TYPES} from "../const";
import AbstractView from "../framework/view/abstract-view";

const DEFAULT_FORM = {
  description: '',
  type: 'flight',
  offers: [],
  finishPoint: '',
  startDate: '',
  startTime: '',
  endTime: '',
  timePeriod: '',
  base_price: 0,
  isFavourite: false,
  pictures: [],
}

const createTypeOption = TYPES.map(type => {
  return `<div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
          </div>`
})
const createEditForm = (formData, allOffers) => {

  const offersByType = allOffers.find(item => item.type === formData.type);

  return `<li class="trip-events__item">
                <form class="event event--edit" action="#" method="post">
                    <header class="event__header">
                        <div class="event__type-wrapper">
                            <label class="event__type  event__type-btn" for="event-type-toggle-1">
                              <span class="visually-hidden">Choose event type</span>
                              <img class="event__type-icon" width="17" height="17" src="img/icons/${formData.type}.png" alt="Event type icon">
                            </label>
                            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                            <div class="event__type-list">
                                <fieldset class="event__type-group">
                                    ${createTypeOption.join('')}
                                </fieldset>
                            </div>
                        </div>
                        <div class="event__field-group  event__field-group--destination">
                            <label class="event__label  event__type-output" for="event-destination-1">${formData.type}</label>
                            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${formData.finishPoint}" list="destination-list-1">
                            <datalist id="destination-list-1">
                              <option value="Amsterdam"></option>
                              <option value="Geneva"></option>
                              <option value="Chamonix"></option>
                            </datalist>
                        </div>

                        <div class="event__field-group  event__field-group--time">
                          <label class="visually-hidden" for="event-start-time-1">From</label>
                          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
                          &mdash;
                          <label class="visually-hidden" for="event-end-time-1">To</label>
                          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
                        </div>

                        <div class="event__field-group  event__field-group--price">
                          <label class="event__label" for="event-price-1">
                            <span class="visually-hidden">Price</span>
                            &euro;
                          </label>
                          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${formData.base_price}">
                        </div>

                        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                        <button class="event__reset-btn" type="reset">Delete</button>
                        <button class="event__rollup-btn" type="button">
                          <span class="visually-hidden">Open event</span>
                        </button>
                    </header>

                    <section class="event__details">
                        <section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                        <div class="event__available-offers">
                            ${offersByType.offers.map(offer => `
                                <div class="event__offer-selector">
                                    <input class="event__offer-checkbox
                                            visually-hidden"
                                            id="event-${offer.title}-1"
                                            type="checkbox"
                                            name="event-${offer.title}"
                                            ${formData.offers.includes(offer.id) ? 'checked' : ''}>
                                    <label class="event__offer-label" for="event-${offer.title}-1">
                                      <span class="event__offer-title">${offer.title}</span>
                                      &plus;&euro;&nbsp;
                                      <span class="event__offer-price">${offer.price}</span>
                                    </label>
                                </div>`).join('')}
                        </div>
                        </section>
                    </section>
                </form>
            </li>`
}
export default class EditDestinationForm extends AbstractView {
  #formData;
  #allOffers;
  #onSubmitForm;

  constructor({formData = DEFAULT_FORM, allOffers, onSubmitForm}) {
    super();
    this.#formData = formData;
    this.#allOffers = allOffers;
    this.#onSubmitForm = onSubmitForm;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickSubmitHandler)
  }
  get template(){
    return createEditForm(this.#formData, this.#allOffers);
  }

  #clickSubmitHandler = (e) => {
    e.preventDefault();
    this.#onSubmitForm();
  }
}
