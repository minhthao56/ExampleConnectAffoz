import axiosClient from "./axiosClient"

const apiLogin = {
    postLogin: (data) => {
      const url = "authentication/login";
      return axiosClient.post(url, data);
    },
  };
  export default apiLogin;