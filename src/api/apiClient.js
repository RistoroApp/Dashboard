import axios from "axios";

export default axios.create({
  baseURL: sessionStorage.getItem("api-url"),
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem("user-token")}`
    }
  }
});
