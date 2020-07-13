<template>
  <v-container>
    <v-row v-if="!type">
      <v-col>
        <v-radio-group v-model="type">
          <v-radio label="Immagine Piatto o Bevanda" value="item"></v-radio>
          <v-radio label="Immagine Generica" value="generic"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <UploadGeneric v-if="type === 'generic'" v-on:completed="completed" />
    <UploadItem v-if="type === 'item'" v-on:completed="completed" />
  </v-container>
</template>

<script>
import UploadGeneric from "../components/Media/UploadGeneric";
import UploadItem from "../components/Media/UploadItem";
export default {
  name: "AddMedia",
  components: { UploadItem, UploadGeneric },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    completed() {
      this.$router.push({ name: "media" });
    }
  }
};
</script>

<style scoped></style>
