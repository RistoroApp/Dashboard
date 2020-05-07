const stepCount = state => state.formData.step;
const nFiles = state => {
  if (state.formUserData.folder) return state.formUserData.files.file.length;
  else return state.formUserData.files.length;
};

export { stepCount, nFiles };
