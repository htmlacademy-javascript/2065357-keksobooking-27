const FILE_TYPES = ['jpeg', 'jpg', 'svg', 'png', 'gif'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housePhotosChooser = document.querySelector('#images');
const housePhotosPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const avatar = avatarChooser.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => avatarName.endsWith(type));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
});

housePhotosChooser.addEventListener('change', () => {
  const photo = housePhotosChooser.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => photoName.endsWith(type));
  if (matches) {
    housePhotosPreview.style.backgroundImage = `url(${URL.createObjectURL(photo)})`;
  }
});
