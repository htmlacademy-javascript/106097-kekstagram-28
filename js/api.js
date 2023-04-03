import {renderPosts} from './thumbnail.js';
import {showAlert} from './util.js';

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
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

// const load = (route, errorText, method = Method.GET, body = null) => {
//   fetch(`${BASE_URL}${route}`, {method, body})
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error();
//       }
//       return response.json();
//     })
//     .catch(() => {
//       showAlert(errorText);
//     });
// };

// const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);
// const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

const getData = () => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((posts) => renderPosts(posts))
    .catch(() => {
      showAlert(ErrorText.GET_DATA);
    });
};

const sendData = (body) => {
  fetch(`${BASE_URL}${Route.SEND_DATA}`, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error(ErrorText.SEND_DATA);
    });
};

export {getData, sendData};
