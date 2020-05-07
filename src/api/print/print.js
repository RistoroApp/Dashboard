import api from "../apiClient";
import store from "../../store/index";

export default {
  getAll: () =>
    new Promise((resolve, reject) => {
      api
        .get("/print/all")
        .then(res => {
          console.log(res.data);
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
          console.log(res.data);
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
          console.log(res);
          let url = window.URL.createObjectURL(new Blob([res.data]));
          console.log(url);
          resolve(url);
        })
        .catch(e => {
          reject(e);
        });
    })
};
