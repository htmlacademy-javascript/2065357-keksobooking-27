import { renderMarker } from './map.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { switchPageMode, setAdFormSubmit } from './user-form.js';
import { getData } from './api.js';
import './validate.js';

switchPageMode();

const ADS_COUNT = 10;

getData((ads) => {
  renderMarker(ads.slice(0, ADS_COUNT));
});

setAdFormSubmit(showSuccessMessage, showErrorMessage);
