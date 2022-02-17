const axios = require('axios');
const Cookies = require('js-cookie');
const timeout = 1000 * 5;
const token = Cookies.get('synaneticsUserToken');
const baseURL = process.env.REACT_APP_BASE_URL;

const request = axios.create({
  baseURL,
  timeout,
  responseType: 'json',
});

request.interceptors.request.use(
  async function (config) {
    if (config.status === 401) {
      await localStorage.clear();
    }
    const token = Cookies.get('synaneticsUserToken');
    if (request) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },

  async function (error) {
    return await Promise.reject(error);
  }
);

export const appendArgsToUrl = (url, queryParams) => {
  const queryString = [];
  Object.keys(queryParams).forEach(function (key) {
    if (queryParams[key] !== null) {
      queryString.push(`${key}=${encodeURIComponent(queryParams[key])}`);
    }
  });
  if (!queryString.length) {
    return url;
  }
  return `${url}?${queryString.join('&')}`;
};

function post(url, data, config) {
  return request.post(url, data, config);
}
function get(url, parameter, config) {
  const finalUrl = appendArgsToUrl(url, parameter);
  return request.get(finalUrl, config);
}

function put(url, data, config) {
  return request.put(url, data, config);
}

function remove(url, config) {
  return request.delete(url, config);
}

function patch(url, data, config) {
  return request.patch(url, data, config);
}

export default Object.freeze({
  get,
  post,
  put,
  remove,
  patch,
  timeout,
  token,
});
