import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.punkapi.com/v2",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getData = async (url) => {
  const res = await instance.get(url);
  return {
    data: res.data,
    status: res.status,
    message: res.statusText,
  };
};
