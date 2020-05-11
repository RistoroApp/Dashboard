import api from "../apiClient";
import store from "../../store/index";

export default {
  getAll: () =>
    new Promise((resolve, reject) => {
      api
        .get("/print/all")
        .then(res => {
          store
            .dispatch("updatePrintings", res.data)
            .then(() => {
              resolve("Data imported");
            })
            .catch(e => reject(e));
        })
        .catch(e => reject(e));
    }),
  getFile: id =>
    new Promise((resolve, reject) => {
      api
        .get(`/print/file/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(e => {
          reject(e);
        });
    }),
  downloadFile: id =>
    new Promise((resolve, reject) => {
      api
        .get(`/print/download/${id}`, { responseType: "blob" })
        .then(res => {
          let url = window.URL.createObjectURL(new Blob([res.data]));
          resolve(url);
        })
        .catch(e => {
          reject(e);
        });
    }),
  setStatus: (id, status) =>
    new Promise((resolve, reject) => {
      api
        .put(
          `/print/setStatus`,
          { id: id, status: status },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          store.dispatch("updateServiceById", res.data);
          resolve(res.data);
        })
        .catch(e => {
          reject(e);
        });
    })
};
