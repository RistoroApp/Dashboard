<template>
  <v-container>
    <v-row align="center" no-gutters>
      <v-col cols="8">
        <v-row align="center">
          <h1 class="display-3 font-weight-thin">Media</h1>
          <v-btn @click="addMedia" text class="mt-2 ml-2" color="primary" small
            ><v-icon>add_circle</v-icon>Aggiungi foto</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-divider id="divider" />
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col
        v-for="item in items"
        :key="item._id"
        class="d-flex child-flex"
        cols="2"
      >
        <v-card flat tile class="d-flex">
          <img
            :src="`http://localhost:3000${item.full}`"
            class="grey lighten-2 elevation-2"
            style="width: 150px; height: 150px; object-fit: cover;"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import media from "../api/media/media";

export default {
  name: "Media",
  data() {
    return {
      items: null,
      loading: false
    };
  },
  async created() {
    await this.update();
  },
  methods: {
    addMedia() {
      this.$router.push({ name: "add-media" });
    },
    async update() {
      try {
        this.loading = true;
        this.items = [
          ...(await media.getAllItems()),
          ...(await media.getAllGenerics())
        ];
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    }
  },
  updated() {
    console.log("updated");
  },
  watch: {
    $route(to, from) {
      console.log("Route Chagne");
      console.log(from);
      console.log(to);
    }
  }
};
</script>

<style scoped></style>
