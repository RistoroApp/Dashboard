import Vue from "vue";
import Vuex from "vuex";

import { updatePrintings, updateServiceById } from "./actions";
import { UPDATE_SERVICES_DATA } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    services: []
  },
  mutations: {
    UPDATE_SERVICES_DATA
  },
  actions: {
    updatePrintings,
    updateServiceById
  },
  modules: {}
});
