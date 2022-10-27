import { renderMarker, renderStartMarkers } from './map.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { switchPageMode, setAdFormSubmit, switchStateMapFilters } from './user-form.js';
import { getData } from './api.js';
import './validate.js';
import { activateFilter, filterAds } from './filter.js';

switchPageMode();

getData((ads) => {
  renderStartMarkers();
  switchStateMapFilters();
  activateFilter(() => {
    renderMarker(filterAds(ads));
  });
});

setAdFormSubmit(showSuccessMessage, showErrorMessage);
