import axios from 'axios/index';
import {API_URL} from '$modules/constants';

const getInitialData = () => {
  return axios({
    method: 'get',
    url: API_URL + '/todos/1',
  }).catch((error) => {
    console.warn(error);
    return null
  });
};

export default getInitialData;
