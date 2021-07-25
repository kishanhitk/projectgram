import axios from "axios";
import { BASE_URL } from "config";
import jwt_decode from "jwt-decode";

export const AuthService = {
  register: (username, email, password) => {
    return axios.post(BASE_URL + "signup", {
      username,
      email,
      password,
    });
  },

  login: async (username, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      console.log(res.data);
      const token = res.data.access_token;
      window.localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
      throw error;
    }
    // return axios
    //   .post(BASE_URL + "/auth/login", {
    //     username,
    //     password,
    //   })
    //   .then((response) => {
    //     if (response.data.access_token) {
    //       localStorage.setItem(
    //         "token",
    //         JSON.stringify(response.data.access_token)
    //       );
    //     }
    //     return response.data;
    //   });
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: () => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (JSON.parse(window.localStorage.getItem("token")))
        return jwt_decode(JSON.parse(window.localStorage.getItem("token")));
      else return null;
    }
    return null;
  },
};
