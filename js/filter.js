import { markerGroup } from './map.js';

const ADS_COUNT = 10;
const ANY = 'any';
const PRICE_FILTER_VALUES = {
  low: (value) => value < 10000,
  middle: (value) => 10000 <= value && value <= 50000,
  high: (value) => 50000 < value
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
  return PRICE_FILTER_VALUES[price.value](offer.price);
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
  filtersContainer.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const resetFilters = () => {
  filtersContainer.reset();
};

export { activateFilter, filterAds, resetFilters };