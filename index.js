import util from 'util';
import bunyan from 'bunyan';
import rp from 'request-promise';
import { wuKey } from './config';

const Hapi = require('hapi');
const server = new Hapi.Server();
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

// function handleError(err) {
//   log.info(err);
// }

// function handleResponse(data) {
//   const parsedData = JSON.parse(data);
//   debugger;
//   log.info(`Today is ${new Date().toLocaleString()}`);
//   log.info(parsedData.forecast.simpleforecast);
// }

function formatCity(str) {
  return str.toUpperCase().split(' ').join('_');
}

function formatState(str) {
  return str.toUpperCase();
}

async function getWeatherData(request, reply) {
  const { type, city, state } = request.url.query;
  const formattedCity = formatCity(city);
  const formattedState = formatState(state);

  try {
    const data = await rp(`http://api.wunderground.com/api/${wuKey}/${type}/q/${formattedState}/${formattedCity}.json`);
    // handleResponse(data);
    reply(data);
  } catch(err) {
    // handleError(err)
    reply('Error fetching data.');
  }

}

server.connection({ port: 3000, host: 'localhost' });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/location',
  handler: getWeatherData
});

server.start((err) => {
  if (err) { throw err; }
  console.log(`Server running at: ${server.info.uri}`);
});
