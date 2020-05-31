import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem("user-token")}`
    }
  }
});
