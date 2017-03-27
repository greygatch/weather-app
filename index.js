
import request from 'request-promise';
import { wuKey } from './config';

console.log('wukey?', wuKey);
request(`http://api.wunderground.com/api/${wuKey}/forecast10day/q/CA/San_Francisco.json`)
  .then(res => console.log(res))
  .catch(err => console.log(err))

// console.log(`Today is ${new Date().toLocaleString()}`);
