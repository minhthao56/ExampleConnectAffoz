import axiosClient from './axiosClient';

const apiCurrentUser = {
  getCurrentUser: () => {
    const url = 'current-user';
    return axiosClient.get(url);
  },
};
export default apiCurrentUser;
