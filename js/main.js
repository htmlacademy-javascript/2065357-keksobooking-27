import { map, mainSettings, renderMarker, renderStartMarkers } from './map.js';
import { showSuccessMessage, showErrorMessage, showGetErrorMessage } from './message.js';
import { switchPageMode, setAdFormSubmit, switchStateMapFilters, switchStateAdForm } from './user-form.js';
import { sendRequest } from './api.js';
import './validate.js';
import { activateFilter, filterAds } from './filter.js';

switchPageMode();

map.on('load', () => {
  switchStateAdForm();
  sendRequest((ads) => {
    renderStartMarkers();
    switchStateMapFilters();
    activateFilter(() => {
      renderMarker(filterAds(ads));
    });
  }, showGetErrorMessage, 'GET');
}).setView({
  lat: mainSettings.lat,
  lng: mainSettings.lng
}, mainSettings.zoom);

setAdFormSubmit(showSuccessMessage, showErrorMessage);
