//AuthorizationServices

import axios from "axios";

const API_URL = "http://localhost:5173/api/v1/auth/";

export const register = (
  firstName: string,
  lastName: String,
  email: string,
  contact: String,
  password: string
) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    email,
    contact,
    password,
  });
};
export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "authenticate", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");

  if (userStr) return JSON.parse(userStr);

  return null;
};
