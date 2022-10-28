import { renderMarker } from './map.js';
import { showSuccessMessage, showErrorMessage, showGetErrorMessage } from './message.js';
import { switchPageMode, setAdFormSubmit } from './user-form.js';
import { request } from './api.js';
import './validate.js';

switchPageMode();

const ADS_COUNT = 10;

request((ads) => {
  renderMarker(ads.slice(0, ADS_COUNT));
}, showGetErrorMessage, 'GET');

setAdFormSubmit(showSuccessMessage, showErrorMessage);
