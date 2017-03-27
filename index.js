import request from 'request-promise';
import { wuKey } from './config';

const wuFeatures = [
  'alerts',
  'conditions',
  'currenthurricane',
  'forecast',
  'forecast10day',
  'geolookup',
  'hourly',
  'hourly10day',
  'planner',
  'rawtide',
  'tide'
];

function handleError(err) {
  console.log(err);
}

function handleResponse(data) {
  console.log(`Today is ${new Date().toLocaleString()}`);
  console.log(data);
}

function formatCity(str) {
  return str.toUpperCase().split(' ').join('_');
}

function formatState(str) {
  return str.toUpperCase();
}

async function getWeatherData(type, city, state) {
  const formattedCity = formatCity(city);
  const formattedState = formatState(state);

  try {
    const data = await request(`http://api.wunderground.com/api/${wuKey}/${type}/q/${formattedState}/${formattedCity}.json`);
    handleResponse(data);
  } catch(err) {
    handleError(err)
  }

}

getWeatherData(wuFeatures[3], 'san francisco', 'ca')
