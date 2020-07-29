<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import api from "./api/apiClient";

export default {
  name: "App",
  async created() {
    this.loading = true;

    try {
      if (!sessionStorage.getItem("api-url")) {
        console.log(process.env.VUE_APP_APIURL);
        let res = await axios.get(
          `${process.env.VUE_APP_BASE_API_URL}/services/getApi`,
          {
            data: {
              origin: window.location.origin
            }
          }
        );
        console.log(res);
        sessionStorage.setItem("api-url", res.data.api);
        api.defaults.baseURL = res.data.api;
      }

      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
