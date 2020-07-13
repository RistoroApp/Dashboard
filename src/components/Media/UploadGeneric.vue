<template>
  <v-container fluid>
    <v-row>
      <v-col :cols="image ? 8 : 12">
        <v-text-field
          ref="name"
          label="Nome Immagine"
          v-model="name"
          :rules="[rules.required]"
        />
        <v-file-input ref="image" v-model="image" :rules="[rules.required]" />
      </v-col>
      <v-col cols="4">
        <v-img v-if="imageUrl" :src="imageUrl" />
      </v-col>
      <v-col cols="12">
        <v-btn
          color="green"
          :disabled="!name || !image"
          :dark="!(!name || !image)"
          class="col-12"
          @click="confirm"
          >Carica</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import media from "../../api/media/media";

export default {
  name: "UploadGeneric",
  data() {
    return {
      name: "",
      image: null,
      imageUrl: null,
      rules: {
        required: value => !!value || "Campo Obbligatorio"
      }
    };
  },
  methods: {
    async confirm() {
      if (!this.name || !this.image) {
        this.$refs["name"].validate(true);
        this.$refs["image"].validate(true);
      } else {
        await media.addGenerics(this.image, this.name);
        this.$emit("completed");
      }
    }
  },
  watch: {
    image: function() {
      this.imageUrl = URL.createObjectURL(this.image);
    }
  }
};
</script>

<style scoped></style>
