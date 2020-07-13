import api from "../apiClient";

export default {
  getAllItems: () =>
    new Promise((resolve, reject) => {
      api
        .get("/media/items")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  getAllGenerics: () =>
    new Promise((resolve, reject) => {
      api
        .get("/media/generics")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  addItem: (original, square, name) =>
    new Promise((resolve, reject) => {
      console.log("Adding a Item Media");
      let formdata = new FormData();

      formdata.append("image", original);
      formdata.append("name", name);
      formdata.append("square", square);

      api
        .post("/media/item", formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 0
        })
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    }),
  addGenerics: (image, name) =>
    new Promise((resolve, reject) => {
      console.log("Adding a Item Media");
      let formdata = new FormData();

      formdata.append("image", image);
      formdata.append("name", name);

      api
        .post("/media/generic", formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 0
        })
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
