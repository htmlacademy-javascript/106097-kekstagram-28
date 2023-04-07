const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу. Ошибка:',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз. Ошибка:',
};

const load = (route, errorText, onError, onSuccess, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, {method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.statusText} ${response.status}`);
    }
    return response.json();
  })
  .then(onSuccess)
  .catch((err) => {
    onError(`${errorText} ${err.message}`);
  });

const getData = (onSuccess, onError) => load(Route.GET_DATA, ErrorText.GET_DATA, onError, onSuccess);
const sendData = (body, onSuccess, onError) => load(Route.SEND_DATA, ErrorText.SEND_DATA, onError, onSuccess, Method.POST, body);

export {getData, sendData};
