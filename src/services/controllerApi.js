import axiosClient from './axiosClient';

const apiController = {
  attachController: data => {
    const url = 'controller/attach';
    console.log(data);
    return axiosClient.post(url, data);
  },
};
export default apiController;
