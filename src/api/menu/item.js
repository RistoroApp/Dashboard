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
  addOne: item =>
    new Promise((resolve, reject) => {
      console.log("Adding a item");
      let formData = new FormData();
      Object.keys(item).forEach(key => {
        if (item[key]) {
          formData.append(key, item[key]);
        }
      });

      for (let value of formData.keys()) {
        console.log(value);
      }
      api
        .post("/menu/item", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 0
        })
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
