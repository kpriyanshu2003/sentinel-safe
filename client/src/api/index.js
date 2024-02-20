import axios from "axios";

const url = axios.create({ baseURL: process.env.NEXT_PUBLIC_serverUrl });


export const generateOTP = (data) =>
  url.get(`/auth/generate-otp?email=${data.email}&name=${data.name}`);

export const verifyOTP = (data) => url.get(`/auth/verify-otp?code=${data}`);



