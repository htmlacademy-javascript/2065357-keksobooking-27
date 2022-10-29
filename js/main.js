import { map, mainSettings, renderMarker, renderStartMarkers } from './map.js';
import { showSuccessMessage, showErrorMessage, showGetErrorMessage } from './message.js';
import { switchPageMode, setAdFormSubmit, switchStateMapFilters, switchStateAdForm } from './user-form.js';
import { request } from './api.js';
import './validate.js';
import { activateFilter, filterAds } from './filter.js';

switchPageMode();

map.on('load', () => {
  switchStateAdForm();
  request((ads) => {
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
