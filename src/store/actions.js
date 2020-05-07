import _ from "lodash";

const updatePrintings = ({ commit }, data) => {
  let newUser = [];
  let newData;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    newData = _.pick(
      data[i],
      [
        "_id",
        "name",
        "surname",
        "email",
        "shipping",
        "files",
        "status",
        "createdAt"
      ],
      {}
    );
    console.log(newData);

    newData.nFiles = data[i].files.length;

    newUser = [...newUser, newData];
  }

  commit("UPDATE_SERVICES_DATA", newUser);
};

export { updatePrintings };
