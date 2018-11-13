import axios from 'axios';

const ajax = axios.create({
  // withCredentials: true,
  headers: { Accept: 'application/json;charset=utf-8' },
});

ajax.interceptors.request.use(function (config) {
  // config.params && (config.params['_'] = +new Date());
  return config;
}, function (error) {
  return Promise.reject(error);
});

ajax.interceptors.response.use(response => {
  if (response.status === 200) {
    const { data } = response;
    if (typeof data === 'string' && data.startsWith('<!DOCTYPE')) {
      return Promise.reject({
        errMsg: 'api error',
        ajaxConfig: JSON.stringify(response.config),
        request: response.request,
      });
    }
    return data;
  } else {
    return Promise.reject(response);
  }
  // return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default ajax;
