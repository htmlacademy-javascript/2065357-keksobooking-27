import { mainSettings, renderMarker, renderStartMarkers, initMap, setOnMapLoad } from './map.js';
import { showSuccessMessage, showErrorMessage, showGetErrorMessage } from './message.js';
import { switchPageMode, setAdFormSubmit, switchStateMapFilters, switchStateAdForm } from './user-form.js';
import { sendRequest } from './api.js';
import { activateFilter, filterAds } from './filter.js';
import './photo.js';

switchPageMode();

setOnMapLoad(() => {
  switchStateAdForm();
  sendRequest((ads) => {
    renderStartMarkers();
    switchStateMapFilters();
    activateFilter(() => {
      renderMarker(filterAds(ads));
    });
  }, showGetErrorMessage, 'GET');
});

initMap(mainSettings);

setAdFormSubmit(showSuccessMessage, showErrorMessage);
