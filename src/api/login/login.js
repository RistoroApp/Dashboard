// import apiClient from "../apiClient";
import axios from "axios";

export default {
  login: loginData =>
    new Promise((resolve, reject) => {
      console.log("Calling api");
      axios
        .post("http://localhost:3000/users/login", loginData)
        .then(res => {
          const token = res.data.token;
          const user = res.data.user;
          localStorage.setItem("user-token", token);
          localStorage.setItem("user", user);
          resolve(user);
        })
        .catch(err => {
          localStorage.removeItem("user-token");
          reject(err);
        });
    })
};
