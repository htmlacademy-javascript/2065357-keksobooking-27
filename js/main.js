import { renderMarker } from './map.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { switchPageMode, setAdFormSubmit } from './user-form.js';
import { getData } from './api.js';
import './validate.js';
import { activateFilter, filterAds } from './filter.js';

switchPageMode();

getData((ads) => {
  renderMarker(filterAds(ads));
  activateFilter(() => {
    renderMarker(filterAds(ads));
  });
});

setAdFormSubmit(showSuccessMessage, showErrorMessage);
