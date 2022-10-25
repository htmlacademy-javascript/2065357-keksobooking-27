const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const postSuccessMessage = successMessageTemplate.cloneNode(true);
const postErrorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = postErrorMessage.querySelector('.error__button');
const getErrorMessage = `<div style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            position: absolute;
                            width: 100%;
                            height: 50px;
                            font-size: 20px;
                            color: red;
                            background-color: #000000;">
                            Ошибка загрузки данных
                          </div>`;

const closeSuccessMessage = () => {
  postSuccessMessage.remove();
  document.removeEventListener('keydown', isEscapeKey);
  document.removeEventListener('click', closeSuccessMessage);
};

const closeErrorMessage = () => {
  postErrorMessage.remove();
  document.removeEventListener('keydown', isEscapeKey);
  document.removeEventListener('click', closeErrorMessage);
  errorButton.removeEventListener('click', closeErrorMessage);
};

const showSuccessMessage = () => {
  document.body.append(postSuccessMessage);
  document.addEventListener('keydown', isEscapeKey);
  document.addEventListener('click', closeSuccessMessage);
};

const showErrorMessage = () => {
  document.body.append(postErrorMessage);
  document.addEventListener('keydown', isEscapeKey);
  document.addEventListener('click', closeErrorMessage);
  errorButton.addEventListener('click', closeErrorMessage);
};

const showGetErrorMessage = () => {
  document.querySelector('.map__filters').innerHTML += getErrorMessage;
};

function isEscapeKey(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

export { showSuccessMessage, showErrorMessage, showGetErrorMessage };
