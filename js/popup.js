import { createAdList } from '../js/data.js';


const cardAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const adList = createAdList();
const adListFragment = document.createDocumentFragment();

adList.forEach(({ author, offer }) => {
  const cardAdElement = cardAdTemplate.cloneNode(true);

  const hideSelector = (selector) => cardAdElement.querySelector(selector).remove();
  const useSelector = (selector) => cardAdElement.querySelector(selector);

  function renderData(selector, data, caption = '') {
    if (!data) {
      hideSelector(selector);
    } else {
      useSelector(selector).textContent = data + caption;
    }
  }

  if (!author.avatar) {
    hideSelector('.popup__avatar');
  } else {
    useSelector('.popup__avatar').src = author.avatar;
  }

  renderData('.popup__title', offer.title);
  renderData('.popup__text--address', offer.address);
  renderData('.popup__text--price', offer.price, ' ₽/ночь');
  renderData('.popup__type', offer.type);
  renderData('.popup__description', offer.description);

  if (!offer.rooms || !offer.guests) {
    hideSelector('.popup__text--capacity');
  } else {
    useSelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if (!offer.checkin || !offer.checkout) {
    hideSelector('.popup__text--time');
  } else {
    useSelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }

  // отрисовка доп опций
  const popupFeatures = cardAdElement.querySelector('.popup__features');
  const popupFeaturesList = popupFeatures.querySelectorAll('.popup__feature');

  if (!offer.features) {
    popupFeatures.remove();
  } else {
    popupFeaturesList.forEach((listItem) => {
      const isRequired = offer.features.some((feature) =>
        listItem.classList.contains(`popup__feature--${feature}`));

      if (!isRequired) {
        listItem.remove();
      }
    });
  }

  // отрисовка фото жилья
  const popupPhotos = cardAdElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  if (!offer.photos) {
    popupPhotos.remove();
  } else {
    popupPhoto.src = offer.photos[0];

    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const popupPhotoElement = popupPhoto.cloneNode(true);
        popupPhotoElement.src = offer.photos[i];
        popupPhotos.append(popupPhotoElement);
      }
    }
  }

  adListFragment.append(cardAdElement);
});

export { adListFragment };
