import axios from "axios";

const url = axios.create({ baseURL: "http://localhost:3300" });

export const generateOTP = (data) =>
  url.get(`/auth/generate-otp?email=${data.email}&name=${data.name}`);

export const verifyOTP = (data) => url.get(`/auth/verify-otp?${data}`);
