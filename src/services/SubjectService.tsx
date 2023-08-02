import React from "react";
import axios from "axios";
const API_URL = "http://localhost:5173/api/v1/op/";

export const getPublicContent = (params: any) => {
  return axios.get(API_URL + "allSubject", { params });
};
export const getSome = (params: any) => {
  return axios.get(API_URL + "someSub", { params });
};

export const getallTeacher = () => {
  return axios.get(API_URL + "teach");
};
