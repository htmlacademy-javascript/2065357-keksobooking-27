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
                              font-weight: 700;
                              color: rgb(238, 0, 0);
                              background-color: #000000;
                              border-radius: 10px;
                              box-shadow: 0 5px 10px 2px rgba(0,0,0, .5);
                              z-index: 1000;">
                              Ошибка загрузки данных
                            </div>`;

const successMessageClickHadler = () => {
  postSuccessMessage.remove();
  document.removeEventListener('keydown', messageEscapeKeydownHandler);
  document.removeEventListener('click', successMessageClickHadler);
};

const errorMessageClickHadler = () => {
  postErrorMessage.remove();
  document.removeEventListener('keydown', messageEscapeKeydownHandler);
  document.removeEventListener('click', errorMessageClickHadler);
  errorButton.removeEventListener('click', errorMessageClickHadler);
};

const showSuccessMessage = () => {
  document.body.append(postSuccessMessage);
  document.addEventListener('keydown', messageEscapeKeydownHandler);
  document.addEventListener('click', successMessageClickHadler);
};

const showErrorMessage = () => {
  document.body.append(postErrorMessage);
  document.addEventListener('keydown', messageEscapeKeydownHandler);
  document.addEventListener('click', errorMessageClickHadler);
  errorButton.addEventListener('click', errorMessageClickHadler);
};

const showGetErrorMessage = () => {
  document.querySelector('.notice').innerHTML += requestErrorMessage;
  setTimeout(() => document.querySelector('.notice').lastChild.remove(), 5000);
};

function messageEscapeKeydownHandler(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    successMessageClickHadler();
    errorMessageClickHadler();
  }
}

export { showSuccessMessage, showErrorMessage, showGetErrorMessage };
