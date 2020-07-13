<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
          label="Nome Immagine"
          v-model="name"
          ref="name"
          aria-required="true"
          :rules="[rules.required]"
        />
        <Cropper @confirm="confirm" @loading="loadingCropper" />
      </v-col>
      <v-col cols="12" v-if="image">
        <v-btn :loading="loading" @click="send" color="green" dark width="100%"
          >Invia</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cropper from "../Cropper";
import media from "../../api/media/media";
export default {
  name: "UploadItem",
  components: { Cropper },
  data() {
    return {
      name: "",
      square: null,
      image: null,
      urlImg: null,
      loading: false,
      formHasErrors: false,
      rules: {
        required: value => !!value || "Nome Obbligatorio"
      }
    };
  },
  methods: {
    confirm(blob, file) {
      this.image = file;
      this.square = blob;
      this.urlImg = URL.createObjectURL(blob);
    },
    async send() {
      if (!this.name) {
        this.$refs["name"].validate(true);
      } else {
        await media.addItem(this.image, this.square, this.name);
        this.$emit("completed");
      }
    },
    loadingCropper(val) {
      this.loading = val;
    }
  }
};
</script>

<style scoped></style>
