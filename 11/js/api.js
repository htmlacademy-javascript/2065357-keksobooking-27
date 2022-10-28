const Urls = {
  GET: 'https://25.javascript.pages.academy/keksobooking/data',
  POST: 'https://25.javascript.pages.academy/keksobooking',
};

const request = (onSuccess, onError, method, data) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: data,
    },
  )
    .then((response) => response.json())
    .then((values) => {
      onSuccess(values);
    }).catch(() => {
      onError();
    });
};

export { request };
