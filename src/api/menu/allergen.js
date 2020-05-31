import api from "../apiClient";

export default {
  getAll: () =>
    new Promise((resolve, reject) => {
      console.log("Getting all Allergen");
      api
        .get("/menu/allergen")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  addOne: allergen =>
    new Promise((resolve, reject) => {
      console.log("Adding an Allergen");
      api
        .post("/menu/allergen", allergen)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  updateOne: (allergen, id) =>
    new Promise((resolve, reject) => {
      console.log("Updating Allergen");
      api
        .put(`/menu/allergen/${id}`, allergen)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  deleteOne: id =>
    new Promise((resolve, reject) => {
      console.log("Deleting an Allergen");
      api
        .delete(`/menu/allergen/${id}`)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    })
};
