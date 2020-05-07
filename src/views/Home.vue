<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app> </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-left">
            <h1 class="display-3">Ordini Attivi</h1>
            <v-divider id="divider" />
            <Orders />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-container>
</template>

<script>
// @ is an alias to /src

import Orders from "../components/Orders";
export default {
  name: "Home",
  components: { Orders },
  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style scoped>
#divider {
  margin: 20px 0;
}
</style>
