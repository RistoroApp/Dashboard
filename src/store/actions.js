import _ from "lodash";

const fields = [
  "_id",
  "name",
  "surname",
  "email",
  "shipping",
  "files",
  "status",
  "createdAt"
];

const updatePrintings = ({ commit }, data) => {
  let services = [];
  let newData;
  for (let i = 0; i < data.length; i++) {
    newData = _.pick(data[i], fields, {});
    newData.nFiles = data[i].files.length;
    services = [...services, newData];
  }

  services = _.orderBy(
    services,
    function(service) {
      return new Date(service.createdAt);
    },
    "desc"
  );
  console.log(services);
  commit("UPDATE_SERVICES_DATA", services);
};

const updateServiceById = ({ commit, state }, data) => {
  let index = _.findIndex(state.services, service => service._id === data._id);
  let services = [...state.services];
  services[index] = _.pick(data, fields, {});
  console.log(services);

  commit("UPDATE_SERVICES_DATA", services);
};

export { updatePrintings, updateServiceById };
