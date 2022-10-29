import { markerGroup, ADS_COUNT, renderStartMarkers } from './map.js';
import { debounce, checkPriceInRange } from './util.js';

const ANY = 'any';
const DELAY_TIME = 500;
const PRICE_FILTER_INTERVALS = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: 100000
  }
};
const filtersContainer = document.querySelector('.map__filters');
const type = filtersContainer.querySelector('#housing-type');
const price = filtersContainer.querySelector('#housing-price');
const rooms = filtersContainer.querySelector('#housing-rooms');
const guests = filtersContainer.querySelector('#housing-guests');
const featuresCheckboxes = document.querySelectorAll('[name="features"]');


const filterType = ({ offer }) => {
  if (type.value === ANY) {
    return true;
  }
  return type.value === offer.type;
};

const filterPrice = ({ offer }) => {
  if (price.value === ANY) {
    return true;
  }
  return checkPriceInRange(offer.price, PRICE_FILTER_INTERVALS[price.value].min, PRICE_FILTER_INTERVALS[price.value].max);
};

const filterRooms = ({ offer }) => {
  if (rooms.value === ANY) {
    return true;
  }
  return rooms.value === offer.rooms.toString();
};

const filterGuests = ({ offer }) => {
  if (guests.value === ANY) {
    return true;
  }
  return guests.value === offer.guests.toString();
};

const filterFeatures = ({ offer }) =>
  Array.from(featuresCheckboxes).every((featureCheckbox) => {
    if (!featureCheckbox.checked) {
      return true;
    }
    if (!offer.features) {
      return false;
    }
    return offer.features.includes(featureCheckbox.value);
  });

const compareAds = (adA, adB) => {
  const rankA = adA.offer.features ? adA.offer.length : 0;
  const rankB = adB.offer.features ? adB.offer.length : 0;

  return rankB - rankA;
};

const filterAds = (arr) => {
  const filteredAds = arr.filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterFeatures);

  return filteredAds.sort(compareAds).slice(0, ADS_COUNT);
};

const activateFilter = (cb) => {
  filtersContainer.addEventListener('change', debounce(() => {
    markerGroup.clearLayers();
    cb();
  }, DELAY_TIME));
};

const resetFilters = () => {
  markerGroup.clearLayers();
  renderStartMarkers();
  filtersContainer.reset();
};

export { activateFilter, filterAds, resetFilters };
