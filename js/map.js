import { sendRequest } from './api.js';
import { showGetErrorMessage } from './message.js';
import { renderAdList } from './popup.js';

const ADS_COUNT = 10;
const mainSettings = {
  lat: 35.68940,
  lng: 139.69200,
  numberDecimals: 5,
  zoom: 11
};
const addressField = document.querySelector('#address');
const map = L.map('map-canvas');

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const mainPinMarker = L.marker(
  {
    lat: mainSettings.lat,
    lng: mainSettings.lng
  },
  {
    draggable: true,
    icon: mainMarkerIcon
  }
);

const initMap = ({ lat, lng, numberDecimals, zoom }) => {
  map.setView({
    lat: lat,
    lng: lng
  }, zoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  mainPinMarker.addTo(map);
  addressField.value = `${lat.toFixed(numberDecimals)}, ${lng.toFixed(numberDecimals)}`;
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

mainPinMarker.on('move', (evt) => {
  const latLng = evt.target.getLatLng();
  addressField.value = `${latLng.lat.toFixed(mainSettings.numberDecimals)}, ${latLng.lng.toFixed(mainSettings.numberDecimals)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const renderMarker = (adList) => {

  adList.forEach(({ location }, index) => {
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng
      },
      {
        icon: markerIcon
      });

    marker
      .addTo(markerGroup)
      .bindPopup(renderAdList(adList, index));
  });
};

const renderStartMarkers = () => {
  sendRequest((ads) => {
    renderMarker(ads.slice(0, ADS_COUNT));
  }, showGetErrorMessage, 'GET');
};

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: mainSettings.lat,
    lng: mainSettings.lng
  });
  map.setView({
    lat: mainSettings.lat,
    lng: mainSettings.lng
  }, mainSettings.zoom);
};

export { renderMarker, resetMap, markerGroup, renderStartMarkers, ADS_COUNT, initMap, setOnMapLoad, mainSettings };
