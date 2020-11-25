import axios from 'axios';


const token = "1212";

const axiosClient = axios.create({
  baseURL: 'http://dede.affoz.com/api/v1/',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    throw err;
  },
);
export default axiosClient;