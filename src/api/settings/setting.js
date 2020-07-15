import api from "../apiClient";

export default {
  getAll: () =>
    new Promise((resolve, reject) => {
      console.log("Getting all Settings");
      api
        .get("/settings")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  getTheme: () =>
    new Promise((resolve, reject) => {
      api
        .get("/settings/getTheme")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  addOne: setting =>
    new Promise((resolve, reject) => {
      console.log("Adding a Setting");
      api
        .post("/settings/", setting)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  updateAll: settings =>
    new Promise((resolve, reject) => {
      console.log("Updating Settings");
      api
        .put(`/settings/`, settings)
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
