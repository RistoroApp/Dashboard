import api from "../apiClient";

export default {
  getAll: () =>
    new Promise((resolve, reject) => {
      console.log("Getting all categories");
      api
        .get("/menu/category")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  addOne: category =>
    new Promise((resolve, reject) => {
      console.log("Adding a category");
      api
        .post("/menu/category", category)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  updateOne: (category, id) =>
    new Promise((resolve, reject) => {
      console.log("Updating Category");
      api
        .put(`/menu/category/${id}`, category)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  deleteOne: id =>
    new Promise((resolve, reject) => {
      console.log("Deleting a Category");
      api
        .delete(`/menu/category/${id}`)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    })
};
