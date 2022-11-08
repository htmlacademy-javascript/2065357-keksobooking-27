const TYPE_DICTIONARY = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};
const cardAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderAdList = ({ author, offer }) => {

  const adListFragment = document.createDocumentFragment();

  const cardAdElement = cardAdTemplate.cloneNode(true);

  const renderData = (selector, data, caption = '') => {
    if (!data) {
      cardAdElement.querySelector(selector).remove();
    } else {
      cardAdElement.querySelector(selector).textContent = data + caption;
    }
  };

  if (!author.avatar) {
    cardAdElement.querySelector('.popup__avatar').remove();
  } else {
    cardAdElement.querySelector('.popup__avatar').src = author.avatar;
  }

  renderData('.popup__title', offer.title);
  renderData('.popup__text--address', offer.address);
  renderData('.popup__text--price', offer.price, ' ₽/ночь');
  renderData('.popup__type', TYPE_DICTIONARY[offer.type]);
  renderData('.popup__description', offer.description);

  if (!offer.rooms || !offer.guests) {
    cardAdElement.querySelector('.popup__text--capacity').remove();
  } else {
    cardAdElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if (!offer.checkin || !offer.checkout) {
    cardAdElement.querySelector('.popup__text--time').remove();
  } else {
    cardAdElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
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

  return adListFragment;
};

export { renderAdList };
