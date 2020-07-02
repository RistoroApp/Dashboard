import api from "../apiClient";

export default {
  getAll: () =>
    new Promise((resolve, reject) => {
      console.log("Getting all categories");
      api
        .get("/menu/tag")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  addOne: tag =>
    new Promise((resolve, reject) => {
      console.log("Adding an ingredient");
      api
        .post("/menu/tag", tag)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  updateOne: (ingredient, id) =>
    new Promise((resolve, reject) => {
      console.log("Updating Ingredient");
      api
        .put(`/menu/tag/${id}`, ingredient)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  deleteOne: id =>
    new Promise((resolve, reject) => {
      console.log("Deleting an Ingredient");
      api
        .delete(`/menu/tag/${id}`)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    })
};
