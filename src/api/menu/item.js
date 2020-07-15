import api from "../apiClient";

export default {
  getAll: () =>
    new Promise((resolve, reject) => {
      console.log("Getting all items");
      api
        .get("/menu/item")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  getOne: id =>
    new Promise((resolve, reject) => {
      api
        .get(`/menu/item/${id}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    }),
  addOne: item =>
    new Promise((resolve, reject) => {
      console.log("Adding a item");
      api
        .post("/menu/item", item)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  updateOne: (item, id) =>
    new Promise((resolve, reject) => {
      console.log("Updating Item");
      api
        .put(`/menu/item/${id}`, item)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  deleteOne: id =>
    new Promise((resolve, reject) => {
      console.log("Deleting a Item");
      api
        .delete(`/menu/item/${id}`)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    })
};
