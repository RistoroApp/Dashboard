<template>
  <v-container fluid>
    <v-row align="center" no-gutters class="mb-4">
      <v-col cols="8">
        <v-row align="center">
          <h1 class="display-3 font-weight-thin">Selezione media</h1>
          <v-btn @click="addMedia" text class="mt-2 ml-2" color="primary" small
            ><v-icon>add_circle</v-icon>Aggiungi foto</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="loading">
      <v-col cols="auto">
        <v-progress-circular indeterminate class="mx-auto" />
      </v-col>
    </v-row>
    <v-row v-if="!loading && !uploading">
      <v-col
        v-for="item in medias"
        :key="item._id"
        class="d-flex child-flex"
        cols="2"
      >
        <v-card
          :ref="item._id"
          flat
          tile
          hover
          link
          :raised="selected === item._id"
          class="d-flex card-media"
          :class="{ 'selected darken-3': selected === item._id }"
          @click="select(item._id)"
        >
          <v-img
            :src="getAddress(item.full)"
            aspect-ratio="1"
            class="grey lighten-2 elevation-2"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!loading && !uploading">
      <v-col cols="3" v-if="back">
        <v-btn
          color="black"
          :dark="!!selected"
          text
          style="width: 100%"
          @click="$emit('back')"
          >Indietro</v-btn
        >
      </v-col>
      <v-col :cols="back ? 9 : 12">
        <v-btn
          color="green"
          :dark="!!selected || nullselection"
          :disabled="!selected && !nullselection"
          style="width: 100%"
          @click="$emit('selection', selected)"
          >{{
            nullselection && !selected ? "Nessuna Immagine" : "Seleziona"
          }}</v-btn
        >
      </v-col>
    </v-row>
    <UploadItem v-if="uploadItem" @completed="completed" />
    <UploadGeneric v-if="uploadGeneric" @completed="completed" />
  </v-container>
</template>

<script>
import media from "../../api/media/media";
import UploadItem from "./UploadItem";
import UploadGeneric from "./UploadGeneric";

export default {
  name: "MediaPicker",
  components: { UploadGeneric, UploadItem },
  props: {
    items: {
      type: Boolean,
      default: false
    },
    generics: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: false
    },
    nullselection: {
      type: Boolean,
      default: false
    },
    oldselection: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      uploading: false,
      medias: [],
      selected: null,
      uploadItem: false,
      uploadGeneric: false
    };
  },
  methods: {
    select(id) {
      if (this.selected === id) {
        this.selected = null;
      } else {
        this.selected = id;
      }
    },
    getAddress(item) {
      return process.env.VUE_APP_API_URL + item;
    },
    addMedia() {
      this.uploading = true;
      this.uploadItem = this.items;
      this.uploadGeneric = this.generics;
    },
    async update() {
      this.loading = true;
      if (this.items) {
        console.log("Download Items");
        this.medias = [...this.medias, ...(await media.getAllItems())];
      }
      if (this.generics) {
        console.log("Download Generics");
        this.medias = [...this.medias, ...(await media.getAllGenerics())];
      }
      setTimeout(
        function() {
          this.loading = false;
        }.bind(this),
        2000
      );
    },
    async completed() {
      this.medias = [];
      await this.update();
      this.uploading = false;
      this.uploadGeneric = false;
      this.uploadItem = false;
    }
  },
  async mounted() {
    await this.update();
    if (this.oldselection) {
      this.selected = this.oldselection;
    }
    console.log(this.oldselection);
    console.log(this.selected);
  }
};
</script>

<style scoped>
.card-media {
  transition-property: border;
  transition-duration: 1s;
}
</style>
