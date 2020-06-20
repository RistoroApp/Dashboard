import api from "../apiClient";

export default {
  getAll: () =>
    new Promise((resolve, reject) => {
      api
        .get("/menu/order")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  complete: id =>
    new Promise((resolve, reject) => {
      api
        .delete(`/menu/order/${id}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
};
