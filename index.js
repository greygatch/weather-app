
import request from 'request-promise';
import { wuKey } from './config';

function handleError(err) {
  console.log(`Today is ${new Date().toLocaleString()}`);
  console.log(err);
}

function handleResponse(res) {
  console.log(res);
}

function formatCity(str) {
  return str.toUpperCase().split(' ').join('_');
}

function formatState(str) {
  return str.toUpperCase();
}

function getWeatherData(type, city, state) {
  const formattedCity = formatCity(city);
  const formattedState = formatState(state);

  request(`http://api.wunderground.com/api/${wuKey}/${type}/q/${formattedState}/${formattedCity}.json`)
    .then(handleResponse)
    .catch(handleError);
}

getWeatherData('forecast', 'san francisco', 'ca')
