import axios from "axios";

const NetworkInstance = () => {
  return axios.create({
    baseURL: "https://crumbs-and-co-restaurant-api.onrender.com/api/",
  });
};

export default NetworkInstance;
