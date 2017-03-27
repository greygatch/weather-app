import util from 'util';
import bunyan from 'bunyan';
import request from 'request-promise';
import { wuKey } from './config';

const log = bunyan.createLogger({name: 'weather-app'});

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
  log.info(err);
}

function handleResponse(data) {
  const parsedData = JSON.parse(data);
  log.info(`Today is ${new Date().toLocaleString()}`);
  log.info(parsedData.forecast.simpleforecast);
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
