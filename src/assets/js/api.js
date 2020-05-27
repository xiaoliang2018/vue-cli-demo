let ajaxUrl2 = 'http://www.sky189.cn';
import axios from 'axios';
import qs from 'qs';

const testAxios = (token,fn1,fn2) => {
    axios.defaults.headers.common['token'] = token;
    axios.get('http://wthrcdn.etouch.cn/weather_mini?city=沈阳')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
export default {
    testAxios
}


