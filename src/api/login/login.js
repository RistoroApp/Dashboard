import api from "../apiClient";

export default {
  login: loginData =>
    new Promise((resolve, reject) => {
      console.log("Calling api");
      api
        .post("/users/login", loginData)
        .then(res => {
          const token = res.data.token;
          const user = res.data.user;
          localStorage.setItem("user-token", token);
          localStorage.setItem("user", user);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          resolve(user);
        })
        .catch(err => {
          localStorage.removeItem("user-token");
          reject(err);
        });
    })
};
