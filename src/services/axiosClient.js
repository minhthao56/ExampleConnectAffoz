import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  baseURL: 'http://dede.affoz.com/api/v1/',
});
axiosClient.interceptors.response.use(
  res => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  err => {
    throw err;
  },
);

axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

export default axiosClient;
