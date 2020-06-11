<template>
  <v-container>
    <v-progress-linear indeterminate v-if="loading" />
    <div v-else>
      <h1>Impostazioni</h1>
      <v-divider />
      <v-card v-for="setting in settings" :key="setting._id">
        <v-card-title>{{ setting.name }}</v-card-title>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import setting from "../api/settings/setting";

export default {
  name: "Settings",
  data() {
    return {
      loading: false,
      settings: null,
      error: null
    };
  },
  async created() {
    try {
      this.loading = true;
      this.settings = await setting.getAll();
      this.loading = false;
    } catch (e) {
      this.error = e;
      this.loading = false;
      console.log(e);
    }
  }
};
</script>

<style scoped></style>
