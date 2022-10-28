const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const postSuccessMessage = successMessageTemplate.cloneNode(true);
const postErrorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = postErrorMessage.querySelector('.error__button');
const requestErrorMessage = `<div style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            position: absolute;
                            top: 100px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 300px;
                            height: 50px;
                            font-size: 20px;
                            color: rgb(238, 0, 0);
                            background-color: #000000;
                            border-radius: 10px;
                            box-shadow: 0 5px 10px 2px rgba(0,0,0, .5);
                            z-index: 1000;">
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
  document.querySelector('.notice').innerHTML += requestErrorMessage;
};

function isEscapeKey(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeSuccessMessage();
    closeErrorMessage();
  }
}

export { showSuccessMessage, showErrorMessage, showGetErrorMessage };
